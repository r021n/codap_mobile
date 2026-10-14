import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import { fileStorageService } from '../services/file-storage.service.js';

type Variables = {
  jwtPayload: {
    sub: string | number;
    username: string;
    exp: number;
    status?: string;
  };
};

const chatUploadRoutes = new Hono<{ Variables: Variables }>();

// Protect upload with JWT
chatUploadRoutes.use('/*', (c, next) => {
  const jwtMiddleware = jwt({
    secret: process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production',
    alg: 'HS256',
  });
  return jwtMiddleware(c, next);
});

// POST /api/chat/upload
chatUploadRoutes.post('/', async (c) => {
  try {
    const body = await c.req.parseBody();
    const file = body['file'];

    if (!file || !(file instanceof File)) {
      return c.json({ error: 'File tidak ditemukan dalam request' }, 400);
    }

    const result = await fileStorageService.saveUploadedFile(file);

    return c.json(
      {
        message: 'File berhasil diunggah',
        ...result,
      },
      200
    );
  } catch (error) {
    console.error('Chat upload error:', error);
    const message =
      error instanceof Error ? error.message : 'Gagal mengunggah file';
    return c.json({ error: message }, 400);
  }
});

export default chatUploadRoutes;
