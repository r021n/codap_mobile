const BASE_URL = import.meta.env.VITE_API_URL || 'https://202.155.13.59.sslip.io/api';

export interface ChatMessageItem {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  createdAt?: string;
}

export interface AdminChatSession {
  id: number;
  moduleKey: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
}

export interface AdminStudentChatOverview {
  id: number;
  fullName: string;
  username: string;
  className: string;
  sessions: AdminChatSession[];
  totalSessions: number;
  totalMessages: number;
  lastActive: string | null;
}

export interface AdminTranscriptResponse {
  session: {
    id: number;
    userId: number;
    moduleKey: string;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
  };
  student: {
    id: number;
    fullName: string;
    username: string;
    className: string;
  };
  messages: ChatMessageItem[];
}

export const chatApi = {
  /**
   * Mengambil riwayat pesan aktif untuk modul tertentu.
   */
  async getHistory(moduleKey: string, token: string): Promise<ChatMessageItem[]> {
    const res = await fetch(`${BASE_URL}/chat/history/${encodeURIComponent(moduleKey)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { error?: string }).error || 'Gagal memuat riwayat chat');
    }

    const data = (await res.json()) as { messages: ChatMessageItem[] };
    return data.messages || [];
  },

  /**
   * Soft-delete / Arsipkan sesi aktif modul tertentu.
   */
  async archiveHistory(moduleKey: string, token: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/chat/archive`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ moduleKey }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { error?: string }).error || 'Gagal mereset riwayat chat');
    }
  },

  /**
   * Mengirim pesan baru via streaming SSE.
   * onChunk dipanggil saat potongan respons AI diterima.
   * onDone dipanggil ketika streaming selesai dan disimpan di DB.
   */
  async streamChatMessage(
    moduleKey: string,
    content: string,
    token: string,
    onChunk: (chunk: string) => void,
    onDone: () => void,
    onError: (err: Error) => void
  ): Promise<void> {
    try {
      const res = await fetch(`${BASE_URL}/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ moduleKey, content }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error || 'Gagal mengirim pesan');
      }

      const reader = res.body?.getReader();
      if (!reader) {
        throw new Error('ReadableStream tidak didukung pada browser ini');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const rawJson = line.slice(6).trim();
            if (!rawJson) continue;

            try {
              const data = JSON.parse(rawJson) as {
                chunk?: string;
                done?: boolean;
                error?: string;
              };

              if (data.error) {
                throw new Error(data.error);
              }

              if (data.chunk) {
                onChunk(data.chunk);
              }

              if (data.done) {
                onDone();
                return;
              }
            } catch (jsonErr) {
              if (jsonErr instanceof Error && jsonErr.message !== 'Unexpected end of JSON input') {
                console.warn('Gagal mem-parse event stream:', rawJson);
              }
            }
          }
        }
      }

      onDone();
    } catch (error) {
      onError(error instanceof Error ? error : new Error('Terjadi kesalahan jaringan'));
    }
  },

  /**
   * Mengambil ringkasan seluruh siswa dan sesi chat-nya untuk Admin.
   */
  async getAdminOverview(token: string): Promise<AdminStudentChatOverview[]> {
    const res = await fetch(`${BASE_URL}/admin/chat/overview`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { error?: string }).error || 'Gagal memuat data chat admin');
    }

    const data = (await res.json()) as { students: AdminStudentChatOverview[] };
    return data.students || [];
  },

  /**
   * Mengambil transkrip lengkap sebuah sesi untuk Admin.
   */
  async getAdminSessionTranscript(sessionId: number, token: string): Promise<AdminTranscriptResponse> {
    const res = await fetch(`${BASE_URL}/admin/chat/session/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { error?: string }).error || 'Gagal memuat transkrip chat');
    }

    return (await res.json()) as AdminTranscriptResponse;
  },
};
