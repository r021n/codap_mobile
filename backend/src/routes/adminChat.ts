import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { usersTable } from '../db/schema.js';
import { chatService } from '../services/chat.service.js';

type Variables = {
  jwtPayload: {
    sub: string | number;
    username: string;
    exp: number;
    status?: string;
  };
};

const adminChatRoutes = new Hono<{ Variables: Variables }>();

const jwtMiddleware = jwt({
  secret: process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production',
  alg: 'HS256',
});

// 1. Verify JWT
adminChatRoutes.use('/*', jwtMiddleware);

// 2. Verify Admin Role
adminChatRoutes.use('/*', async (c, next) => {
  const payload = c.get('jwtPayload');
  const userId = Number(payload.sub);

  const currentUser = await db
    .select({ status: usersTable.status })
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .get();

  if (currentUser?.status !== 'admin') {
    return c.json({ error: 'Akses ditolak. Endpoint ini khusus untuk Admin.' }, 403);
  }

  await next();
});

// GET /api/admin/chat/overview - Ringkasan seluruh siswa dan sesi chat-nya (Aktif & Arsip)
adminChatRoutes.get('/overview', async (c) => {
  try {
    const overview = await chatService.getAdminOverview();
    return c.json({ students: overview }, 200);
  } catch (error) {
    console.error('Admin chat overview error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /api/admin/chat/session/:sessionId - Detail transkrip lengkap sebuah sesi chat
adminChatRoutes.get('/session/:sessionId', async (c) => {
  try {
    const sessionId = Number(c.req.param('sessionId'));
    if (!sessionId || isNaN(sessionId)) {
      return c.json({ error: 'Invalid sessionId' }, 400);
    }

    const transcript = await chatService.getAdminSessionTranscript(sessionId);
    if (!transcript) {
      return c.json({ error: 'Sesi chat tidak ditemukan' }, 404);
    }

    return c.json(transcript, 200);
  } catch (error) {
    console.error('Admin chat transcript error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default adminChatRoutes;
