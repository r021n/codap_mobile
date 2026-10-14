import { chatRepository } from '../db/chat.repository.js';
import { aiService, type AIMessage } from './ai.service.js';

export const chatService = {
  /**
   * Ambil riwayat chat sesi aktif untuk modul tertentu milik siswa.
   */
  async getStudentHistory(userId: number, moduleKey: string) {
    const session = await chatRepository.getActiveSession(userId, moduleKey);
    if (!session) {
      return { sessionId: null, messages: [] };
    }

    const messages = await chatRepository.getAllSessionMessages(session.id);
    return {
      sessionId: session.id,
      messages: messages.map((m) => ({
        id: String(m.id),
        sender: m.role === 'assistant' ? ('ai' as const) : ('user' as const),
        text: m.content,
        createdAt: m.createdAt,
      })),
    };
  },

  /**
   * Soft-delete: Arsipkan sesi aktif modul tersebut.
   */
  async archiveStudentSession(userId: number, moduleKey: string) {
    const success = await chatRepository.archiveActiveSession(userId, moduleKey);
    return { success };
  },

  /**
   * Tangani pesan baru, kirim stream ke client via callback, dan simpan kedua pesan ke database secara atomic.
   */
  async processStreamMessage(
    userId: number,
    moduleKey: string,
    content: string,
    onChunk: (chunk: string) => void
  ) {
    // 1. Dapatkan atau buat sesi aktif
    const session = await chatRepository.getOrCreateActiveSession(userId, moduleKey);

    // 2. Simpan pesan siswa terlebih dahulu
    const userMessage = await chatRepository.saveMessage(session.id, 'user', content);

    // 3. Ambil sliding-window (8 pesan terakhir) untuk konteks percakapan AI
    const recentMessages = await chatRepository.getRecentMessages(session.id, 8);
    const aiContextMessages: AIMessage[] = recentMessages.map((m) => ({
      role: m.role as 'user' | 'assistant' | 'system',
      content: m.content,
    }));

    // 4. Lakukan streaming AI via OpenRouter
    const fullAssistantText = await aiService.streamChat(
      aiContextMessages,
      onChunk
    );

    // 5. Simpan respons AI lengkap ke database
    const assistantMessage = await chatRepository.saveMessage(
      session.id,
      'assistant',
      fullAssistantText
    );

    return {
      sessionId: session.id,
      userMessage,
      assistantMessage,
    };
  },

  /**
   * Ambil ringkasan aktivitas chat semua siswa untuk Admin.
   */
  async getAdminOverview() {
    return chatRepository.getAdminStudentsChatOverview();
  },

  /**
   * Ambil transkrip lengkap satu sesi chat untuk Admin.
   */
  async getAdminSessionTranscript(sessionId: number) {
    const sessionData = await chatRepository.getSessionWithUser(sessionId);
    if (!sessionData) {
      return null;
    }

    const rawMessages = await chatRepository.getAllSessionMessages(sessionId);
    const messages = rawMessages.map((m) => ({
      id: String(m.id),
      sender: m.role === 'assistant' ? ('ai' as const) : ('user' as const),
      text: m.content,
      createdAt: m.createdAt,
    }));

    return {
      session: sessionData.session,
      student: sessionData.user,
      messages,
    };
  },
};
