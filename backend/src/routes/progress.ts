import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import { eq, and, or, like, inArray, sql, asc } from 'drizzle-orm';
import { db } from '../db/index.js';
import { userProgressTable, usersTable } from '../db/schema.js';
import { memoryCache } from '../services/cache.service.js';

type Variables = {
  jwtPayload: {
    sub: string | number;
    username: string;
    exp: number;
  }
}

const progressRoutes = new Hono<{ Variables: Variables }>();

// Middleware to protect these routes
progressRoutes.use('/*', (c, next) => {
  const jwtMiddleware = jwt({
    secret: process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production',
    alg: 'HS256',
  });
  return jwtMiddleware(c, next);
});

// POST /api/progress - Mark a page/stage as completed
progressRoutes.post('/', async (c) => {
  try {
    const payload = c.get('jwtPayload');
    const userId = payload.sub as number;
    
    const body = await c.req.json();
    const { pageName } = body;

    if (!pageName) {
      return c.json({ error: 'pageName is required' }, 400);
    }

    await db.insert(userProgressTable).values({
      userId,
      pageName,
    }).onConflictDoNothing();

    // Invalidate progress cache
    memoryCache.invalidateTag('progress');

    return c.json({ message: 'Progress saved successfully' }, 200);
  } catch (error) {
    console.error('Save progress error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /api/progress - Get all completed pages for the logged-in user
progressRoutes.get('/', async (c) => {
  try {
    const payload = c.get('jwtPayload');
    const userId = payload.sub as number;

    const progressList = await db.select({ pageName: userProgressTable.pageName })
      .from(userProgressTable)
      .where(eq(userProgressTable.userId, userId));
      
    const completedPages = progressList.map(p => p.pageName);
    return c.json({ completedPages }, 200);
  } catch (error) {
    console.error('Get progress error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /api/progress/all - Get all users' progress (Admin only)
progressRoutes.get('/all', async (c) => {
  try {
    const payload = c.get('jwtPayload');
    const userId = payload.sub as number;

    const currentUser = await db.select().from(usersTable).where(eq(usersTable.id, userId)).get();
    if (currentUser?.status !== 'admin') {
      return c.json({ error: 'Unauthorized' }, 403);
    }

    const page = Math.max(1, Number(c.req.query('page') || 1));
    const limit = c.req.query('limit') ? Math.max(1, Number(c.req.query('limit'))) : 15;
    const search = c.req.query('search')?.trim();
    const className = c.req.query('className')?.trim();
    const all = c.req.query('all') === 'true';

    const cacheKey = `progress:all:${page}:${limit}:${search || ''}:${className || ''}:${all}`;
    const cached = memoryCache.get(cacheKey);
    if (cached) {
      return c.json(cached, 200);
    }

    // Build query conditions
    const userConditions = [eq(usersTable.status, 'student')];
    if (className) {
      userConditions.push(eq(usersTable.className, className));
    }
    if (search) {
      const searchPattern = `%${search}%`;
      userConditions.push(
        or(
          like(usersTable.fullName, searchPattern),
          like(usersTable.username, searchPattern)
        )!
      );
    }

    const whereClause = and(...userConditions);

    // Count total matching students
    const [countResult] = await db
      .select({ total: sql<number>`count(*)` })
      .from(usersTable)
      .where(whereClause);

    const totalRecords = Number(countResult?.total || 0);
    const totalPages = all ? 1 : Math.ceil(totalRecords / limit) || 1;

    let userQuery = db
      .select()
      .from(usersTable)
      .where(whereClause)
      .orderBy(asc(usersTable.fullName));

    if (!all) {
      const offset = (page - 1) * limit;
      userQuery = userQuery.limit(limit).offset(offset) as typeof userQuery;
    }

    const matchingUsers = await userQuery;

    if (matchingUsers.length === 0) {
      const emptyResult = {
        data: [],
        pagination: {
          page,
          limit: all ? 0 : limit,
          totalRecords,
          totalPages,
          hasMore: false,
        },
      };
      memoryCache.set(cacheKey, emptyResult, 30, ['progress']);
      return c.json(emptyResult, 200);
    }

    const userIds = matchingUsers.map(u => u.id);

    // Fetch progress only for these users
    const relatedProgress = await db
      .select()
      .from(userProgressTable)
      .where(inArray(userProgressTable.userId, userIds));

    const progressByUser = matchingUsers.map(user => {
      const userProgress = relatedProgress.filter(p => p.userId === user.id);
      return {
        id: user.id,
        fullName: user.fullName,
        className: user.className,
        status: user.status,
        completedPagesCount: userProgress.length,
        completedPages: userProgress.map(p => p.pageName)
      };
    });

    const result = {
      data: progressByUser,
      pagination: {
        page,
        limit: all ? totalRecords : limit,
        totalRecords,
        totalPages,
        hasMore: page < totalPages,
      },
    };

    memoryCache.set(cacheKey, result, 30, ['progress']);
    return c.json(result, 200);
  } catch (error) {
    console.error('Get all progress error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default progressRoutes;
