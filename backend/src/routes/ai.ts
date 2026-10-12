import { Hono } from 'hono';
import { jwt } from 'hono/jwt';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatRequestBody {
  messages: ChatMessage[];
  systemInstruction?: string;
  temperature?: number;
  maxTokens?: number;
}

const DEFAULT_SYSTEM_INSTRUCTION = `Kamu adalah "Asisten AI CODAP", asisten cerdas yang membantu siswa dalam pembelajaran sains, khususnya tentang kualitas udara dan analisis data menggunakan platform CODAP (Common Online Data Analysis Platform).

Panduan perilaku:
- Jawab dalam Bahasa Indonesia yang sopan dan mudah dipahami
- Berikan jawaban yang informatif, ringkas, dan relevan dengan topik pembelajaran
- Jika siswa bertanya di luar topik, arahkan kembali dengan sopan
- Gunakan contoh konkret dari data kualitas udara jika relevan
- Dorong siswa untuk berpikir kritis dan menemukan jawaban sendiri
- Jangan memberikan jawaban langsung untuk tugas/kuis, tapi berikan petunjuk`;

const aiRoutes = new Hono();

// Middleware: verifikasi JWT jika ada header Authorization; wajib di production
aiRoutes.use('/*', async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (authHeader) {
    const jwtMiddleware = jwt({
      secret: process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production',
      alg: 'HS256',
    });
    return jwtMiddleware(c, next);
  }

  // Jika production dan tidak ada auth header, tolak request
  if (process.env.NODE_ENV === 'production') {
    return c.json({ error: 'Unauthorized: Bearer token is required' }, 401);
  }

  await next();
});

// POST /api/ai/chat - Non-streaming chat completions
aiRoutes.post('/chat', async (c) => {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return c.json({ error: 'OPENROUTER_API_KEY is not configured on server' }, 500);
    }

    const body = await c.req.json<ChatRequestBody>().catch(() => null);
    if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
      return c.json({ error: 'messages array is required and must not be empty' }, 400);
    }

    // Sliding window: ambil maksimal 8 pesan percakapan terakhir untuk hemat token
    const trimmedMessages = body.messages.slice(-8);

    // Sisipkan system instruction di pesan terdepan
    const systemInstruction = body.systemInstruction || DEFAULT_SYSTEM_INSTRUCTION;
    const messagesToSend: ChatMessage[] = [
      { role: 'system', content: systemInstruction },
      ...trimmedMessages,
    ];

    const model = process.env.OPENROUTER_MODEL || 'xiaomi/mimo-v2.6-flash';

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://codap-mobile.app',
        'X-Title': 'CODAP Mobile',
      },
      body: JSON.stringify({
        model,
        messages: messagesToSend,
        // Nonaktifkan thinking/reasoning token agar hemat biaya & respons lebih cepat
        reasoning: {
          effort: 'none',
          exclude: true,
        },
        max_tokens: body.maxTokens ?? 1024,
        temperature: body.temperature ?? 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      return c.json(
        {
          error: 'AI service request failed',
          status: response.status,
          details: errorText,
        },
        response.status as 400 | 500 | 502
      );
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };

    const text =
      data.choices?.[0]?.message?.content ||
      'Maaf, saya tidak dapat merespons saat ini.';

    return c.json({ text });
  } catch (error) {
    console.error('AI chat route error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /api/ai/chat/stream - Streaming SSE chat completions
aiRoutes.post('/chat/stream', async (c) => {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return c.json({ error: 'OPENROUTER_API_KEY is not configured on server' }, 500);
    }

    const body = await c.req.json<ChatRequestBody>().catch(() => null);
    if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
      return c.json({ error: 'messages array is required and must not be empty' }, 400);
    }

    const trimmedMessages = body.messages.slice(-8);
    const systemInstruction = body.systemInstruction || DEFAULT_SYSTEM_INSTRUCTION;
    const messagesToSend: ChatMessage[] = [
      { role: 'system', content: systemInstruction },
      ...trimmedMessages,
    ];

    const model = process.env.OPENROUTER_MODEL || 'xiaomi/mimo-v2.6-flash';

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://codap-mobile.app',
        'X-Title': 'CODAP Mobile',
      },
      body: JSON.stringify({
        model,
        messages: messagesToSend,
        stream: true,
        reasoning: {
          effort: 'none',
          exclude: true,
        },
        max_tokens: body.maxTokens ?? 1024,
        temperature: body.temperature ?? 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter stream API error:', response.status, errorText);
      return c.json(
        {
          error: 'AI stream request failed',
          status: response.status,
          details: errorText,
        },
        response.status as 400 | 500 | 502
      );
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('AI chat stream error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default aiRoutes;
