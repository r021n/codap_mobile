export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const DEFAULT_SYSTEM_INSTRUCTION = `Kamu adalah "Asisten AI CODAP", asisten cerdas yang membantu siswa dalam pembelajaran sains, khususnya tentang kualitas udara dan analisis data menggunakan platform CODAP (Common Online Data Analysis Platform).

Panduan perilaku:
- Jawab dalam Bahasa Indonesia yang sopan dan mudah dipahami
- Berikan jawaban yang informatif, ringkas, dan relevan dengan topik pembelajaran
- Jika siswa bertanya di luar topik, arahkan kembali dengan sopan
- Gunakan contoh konkret dari data kualitas udara jika relevan
- Dorong siswa untuk berpikir kritis dan menemukan jawaban sendiri
- Jangan memberikan jawaban langsung untuk tugas/kuis, tapi berikan petunjuk`;

export const aiService = {
  /**
   * Panggil OpenRouter API dengan streaming aktif, meneruskan setiap chunk teks melalui callback onChunk.
   */
  async streamChat(
    messages: AIMessage[],
    onChunk: (chunk: string) => void,
    systemInstruction = DEFAULT_SYSTEM_INSTRUCTION
  ): Promise<string> {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY is not configured on server');
    }

    const model = process.env.OPENROUTER_MODEL || 'xiaomi/mimo-v2.6-flash';
    const messagesToSend: AIMessage[] = [
      { role: 'system', content: systemInstruction },
      ...messages,
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
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
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter stream failed (${response.status}): ${errorText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No readable stream from OpenRouter');
    }

    const decoder = new TextDecoder();
    let accumulatedText = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') continue;

          try {
            const parsed = JSON.parse(jsonStr) as {
              choices?: {
                delta?: { content?: string };
                message?: { content?: string };
              }[];
            };
            const textChunk =
              parsed?.choices?.[0]?.delta?.content ||
              parsed?.choices?.[0]?.message?.content ||
              '';

            if (textChunk) {
              accumulatedText += textChunk;
              onChunk(textChunk);
            }
          } catch {
            // Abaikan parsing error untuk partial JSON
          }
        }
      }
    }

    return accumulatedText;
  },
};
