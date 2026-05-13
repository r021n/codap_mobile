/**
 * AI Service – communicates with the CODAP AI Worker (Cloudflare)
 *
 * Change WORKER_URL to your deployed Cloudflare Worker URL.
 * During local development you can use http://localhost:8787
 */

// ─── Configuration ──────────────────────────────────────────────────────────

const WORKER_URL = import.meta.env.VITE_AI_WORKER_URL || 'http://localhost:8787';

// System instruction that sets the AI assistant's persona
const SYSTEM_INSTRUCTION = `Kamu adalah "Asisten AI CODAP", asisten cerdas yang membantu siswa dalam pembelajaran sains, khususnya tentang kualitas udara dan analisis data menggunakan platform CODAP (Common Online Data Analysis Platform).

Panduan perilaku:
- Jawab dalam Bahasa Indonesia yang sopan dan mudah dipahami
- Berikan jawaban yang informatif, ringkas, dan relevan dengan topik pembelajaran
- Jika siswa bertanya di luar topik, arahkan kembali dengan sopan
- Gunakan contoh konkret dari data kualitas udara jika relevan
- Dorong siswa untuk berpikir kritis dan menemukan jawaban sendiri
- Jangan memberikan jawaban langsung untuk tugas/kuis, tapi berikan petunjuk`;

// ─── Types ──────────────────────────────────────────────────────────────────

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface AIServiceOptions {
  temperature?: number;
  maxOutputTokens?: number;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Convert the component's ChatMessage[] history into Gemini-compatible format.
 * The `messages` prop from AIChatModal uses sender:'ai'|'user', but Gemini
 * expects role:'model'|'user'.
 */
export function toGeminiMessages(
  history: { sender: 'ai' | 'user'; text: string }[]
): GeminiMessage[] {
  return history.map((m) => ({
    role: m.sender === 'ai' ? 'model' : 'user',
    parts: [{ text: m.text }],
  }));
}

// ─── API Calls ──────────────────────────────────────────────────────────────

/**
 * Send a non-streaming chat request to the worker.
 * Returns the AI's response text.
 */
export async function sendChatMessage(
  messages: GeminiMessage[],
  options?: AIServiceOptions
): Promise<string> {
  const res = await fetch(`${WORKER_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages,
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        temperature: options?.temperature ?? 0.7,
        maxOutputTokens: options?.maxOutputTokens ?? 2048,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error((err as { error?: string }).error || `HTTP ${res.status}`);
  }

  const data = (await res.json()) as { text: string };
  return data.text;
}

/**
 * Send a streaming chat request to the worker.
 * Calls `onChunk` for each piece of text received, and `onDone` when complete.
 */
export async function sendChatMessageStream(
  messages: GeminiMessage[],
  onChunk: (text: string) => void,
  onDone: () => void,
  options?: AIServiceOptions
): Promise<void> {
  const res = await fetch(`${WORKER_URL}/api/chat/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages,
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        temperature: options?.temperature ?? 0.7,
        maxOutputTokens: options?.maxOutputTokens ?? 2048,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error((err as { error?: string }).error || `HTTP ${res.status}`);
  }

  const reader = res.body?.getReader();
  if (!reader) {
    throw new Error('No readable stream returned');
  }

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // Process complete SSE lines
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? ''; // keep incomplete last line in buffer

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const jsonStr = line.slice(6).trim();
        if (jsonStr === '[DONE]') continue;

        try {
          const parsed = JSON.parse(jsonStr) as {
            candidates?: {
              content?: { parts?: { text?: string; thought?: boolean }[] };
            }[];
          };
          const parts = parsed?.candidates?.[0]?.content?.parts ?? [];
          const text = parts
            .filter((p) => !p.thought)
            .map((p) => p.text)
            .filter((t) => t !== undefined)
            .join("");

          if (text) {
            onChunk(text);
          }
        } catch {
          // skip malformed JSON chunks
        }
      }
    }
  }

  onDone();
}
