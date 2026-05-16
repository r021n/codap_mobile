import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { userProgressTable } from '../db/schema.js';

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

export default progressRoutes;
