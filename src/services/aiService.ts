/**
 * AI Service – communicates with the Backend AI Route (Hono / OpenRouter)
 *
 * Uses OpenRouter API (model: xiaomi/mimo-v2.6-flash) via Backend proxy
 * with thinking/reasoning disabled for maximum cost efficiency.
 */

// ─── Configuration ──────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL || 'https://202.155.13.59.sslip.io/api';

// System instruction that sets the AI assistant's persona
export const SYSTEM_INSTRUCTION = `Kamu adalah "Asisten AI CODAP", asisten cerdas yang membantu siswa dalam pembelajaran sains, khususnya tentang kualitas udara dan analisis data menggunakan platform CODAP (Common Online Data Analysis Platform).

Panduan perilaku:
- Jawab dalam Bahasa Indonesia yang sopan dan mudah dipahami
- Berikan jawaban yang informatif, ringkas, dan relevan dengan topik pembelajaran
- Jika siswa bertanya di luar topik, arahkan kembali dengan sopan
- Gunakan contoh konkret dari data kualitas udara jika relevan
- Dorong siswa untuk berpikir kritis dan menemukan jawaban sendiri
- Jangan memberikan jawaban langsung untuk tugas/kuis, tapi berikan petunjuk`;

// ─── Types ──────────────────────────────────────────────────────────────────

export interface AIMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

// Backward-compatibility alias
export type GeminiMessage = AIMessage;

export interface AIServiceOptions {
  temperature?: number;
  maxOutputTokens?: number;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Convert the component's ChatMessage[] history into standard OpenAI/OpenRouter format.
 */
export function toAIMessages(
  history: { sender: "ai" | "user"; text: string }[],
): AIMessage[] {
  return history.map((m) => ({
    role: m.sender === "ai" ? "assistant" : "user",
    content: m.text,
  }));
}

// Backward-compatibility alias
export const toGeminiMessages = toAIMessages;

// ─── API Calls ──────────────────────────────────────────────────────────────

/**
 * Send a non-streaming chat request to the backend AI route.
 * Returns the AI's response text.
 */
export async function sendChatMessage(
  messages: AIMessage[],
  options?: AIServiceOptions,
): Promise<string> {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}/ai/chat`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      messages,
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: options?.temperature ?? 0.7,
      maxTokens: options?.maxOutputTokens ?? 1024,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error((err as { error?: string }).error || `HTTP ${res.status}`);
  }

  const data = (await res.json()) as { text: string };
  return data.text;
}

/**
 * Send a streaming chat request to the backend AI route.
 * Calls `onChunk` for each piece of text received, and `onDone` when complete.
 */
export async function sendChatMessageStream(
  messages: AIMessage[],
  onChunk: (text: string) => void,
  onDone: () => void,
  options?: AIServiceOptions,
): Promise<void> {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}/ai/chat/stream`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      messages,
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: options?.temperature ?? 0.7,
      maxTokens: options?.maxOutputTokens ?? 1024,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error((err as { error?: string }).error || `HTTP ${res.status}`);
  }

  const reader = res.body?.getReader();
  if (!reader) {
    throw new Error("No readable stream returned");
  }

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // Process complete SSE lines
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? ""; // keep incomplete last line in buffer

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") continue;

        try {
          const parsed = JSON.parse(jsonStr) as {
            choices?: {
              delta?: { content?: string };
              message?: { content?: string };
            }[];
          };
          const text =
            parsed?.choices?.[0]?.delta?.content ||
            parsed?.choices?.[0]?.message?.content ||
            "";

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
