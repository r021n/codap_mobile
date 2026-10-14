import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import { streamSSE } from 'hono/streaming';
import { chatService } from '../services/chat.service.js';

type Variables = {
  jwtPayload: {
    sub: string | number;
    username: string;
    exp: number;
    status?: string;
  };
};

const chatRoutes = new Hono<{ Variables: Variables }>();

// Protect all chat routes with JWT
chatRoutes.use('/*', (c, next) => {
  const jwtMiddleware = jwt({
    secret: process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production',
    alg: 'HS256',
  });
  return jwtMiddleware(c, next);
});

// GET /api/chat/history/:moduleKey - Ambil riwayat chat modul tertentu milik siswa
chatRoutes.get('/history/:moduleKey', async (c) => {
  try {
    const payload = c.get('jwtPayload');
    const userId = Number(payload.sub);
    const moduleKey = c.req.param('moduleKey');

    if (!moduleKey) {
      return c.json({ error: 'moduleKey is required' }, 400);
    }

    const data = await chatService.getStudentHistory(userId, moduleKey);
    return c.json(data, 200);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /api/chat/archive - Soft delete (arsipkan sesi aktif modul tertentu)
chatRoutes.post('/archive', async (c) => {
  try {
    const payload = c.get('jwtPayload');
    const userId = Number(payload.sub);
    const body = await c.req.json<{ moduleKey?: string }>().catch(() => null);
    const moduleKey = body?.moduleKey;

    if (!moduleKey) {
      return c.json({ error: 'moduleKey is required' }, 400);
    }

    const result = await chatService.archiveStudentSession(userId, moduleKey);
    return c.json({ message: 'Riwayat chat berhasil diarsipkan', ...result }, 200);
  } catch (error) {
    console.error('Error archiving chat session:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /api/chat/stream - Streaming SSE chat dengan penyimpanan otomatis ke DB
chatRoutes.post('/stream', async (c) => {
  try {
    const payload = c.get('jwtPayload');
    const userId = Number(payload.sub);

    const body = await c.req
      .json<{ moduleKey?: string; content?: string }>()
      .catch(() => null);

    if (!body || !body.moduleKey || !body.content?.trim()) {
      return c.json({ error: 'moduleKey and content are required' }, 400);
    }

    const { moduleKey, content } = body;

    return streamSSE(c, async (stream) => {
      try {
        const result = await chatService.processStreamMessage(
          userId,
          moduleKey,
          content.trim(),
          async (chunk) => {
            await stream.writeSSE({
              data: JSON.stringify({ chunk }),
            });
          }
        );

        // Kirim event selesai beserta ID pesan yang tersimpan di DB
        await stream.writeSSE({
          data: JSON.stringify({
            done: true,
            sessionId: result.sessionId,
            userMessageId: result.userMessage.id,
            assistantMessageId: result.assistantMessage.id,
          }),
        });
      } catch (streamError) {
        console.error('Chat streaming error inside streamSSE:', streamError);
        await stream.writeSSE({
          data: JSON.stringify({
            error:
              streamError instanceof Error
                ? streamError.message
                : 'Terjadi kesalahan saat memproses streaming AI',
          }),
        });
      }
    });
  } catch (error) {
    console.error('Error in chat stream endpoint:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default chatRoutes;
