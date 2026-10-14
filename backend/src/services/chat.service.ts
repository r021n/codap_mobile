import { chatRepository, type AdminOverviewFilterOptions } from '../db/chat.repository.js';
import { aiService, type AIMessage } from './ai.service.js';
import {
  promptBuilderService,
  type ChatAttachmentInput,
} from './prompt-builder.service.js';
import { memoryCache } from './cache.service.js';

export const chatService = {
  /**
   * Ambil riwayat chat sesi aktif untuk modul tertentu milik siswa.
   */
  async getStudentHistory(
    userId: number,
    moduleKey: string,
    options?: { cursor?: number; limit?: number }
  ) {
    const session = await chatRepository.getActiveSession(userId, moduleKey);
    if (!session) {
      return {
        sessionId: null,
        messages: [],
        pagination: { hasMore: false, nextCursor: null, limit: options?.limit || 0 },
      };
    }

    if (options?.limit) {
      const paginated = await chatRepository.getPaginatedSessionMessages(
        session.id,
        options.cursor,
        options.limit
      );
      return {
        sessionId: session.id,
        messages: paginated.messages.map((m) => ({
          id: String(m.id),
          sender: m.role === 'assistant' ? ('ai' as const) : ('user' as const),
          text: m.content,
          attachmentUrl: m.attachmentUrl ?? undefined,
          attachmentType: m.attachmentType ?? undefined,
          attachmentName: m.attachmentName ?? undefined,
          createdAt: m.createdAt,
        })),
        pagination: {
          hasMore: paginated.hasMore,
          nextCursor: paginated.nextCursor,
          limit: options.limit,
        },
      };
    }

    const messages = await chatRepository.getAllSessionMessages(session.id);
    return {
      sessionId: session.id,
      messages: messages.map((m) => ({
        id: String(m.id),
        sender: m.role === 'assistant' ? ('ai' as const) : ('user' as const),
        text: m.content,
        attachmentUrl: m.attachmentUrl ?? undefined,
        attachmentType: m.attachmentType ?? undefined,
        attachmentName: m.attachmentName ?? undefined,
        createdAt: m.createdAt,
      })),
      pagination: {
        hasMore: false,
        nextCursor: null,
        limit: messages.length,
      },
    };
  },

  /**
   * Soft-delete: Arsipkan sesi aktif modul tersebut.
   */
  async archiveStudentSession(userId: number, moduleKey: string) {
    const success = await chatRepository.archiveActiveSession(userId, moduleKey);
    memoryCache.invalidateTag('chat');
    memoryCache.invalidateTag('admin');
    return { success };
  },

  /**
   * Tangani pesan baru (dengan dukungan lampiran gambar/data), kirim stream ke client via callback,
   * dan simpan kedua pesan ke database secara atomic.
   */
  async processStreamMessage(
    userId: number,
    moduleKey: string,
    content: string,
    onChunk: (chunk: string) => void,
    attachment?: ChatAttachmentInput
  ) {
    // 1. Dapatkan atau buat sesi aktif
    const session = await chatRepository.getOrCreateActiveSession(userId, moduleKey);

    // 2. Simpan pesan siswa terlebih dahulu beserta data attachment
    const userMessage = await chatRepository.saveMessage(
      session.id,
      'user',
      content,
      attachment
        ? {
            url: attachment.url,
            type: attachment.type,
            name: attachment.name,
          }
        : undefined
    );

    // 3. Ambil sliding-window (8 pesan terakhir) untuk konteks percakapan AI
    const recentMessages = await chatRepository.getRecentMessages(session.id, 8);
    
    // Bentuk konteks: pesan-pesan lama dalam bentuk teks
    // Kecuali pesan terakhir yang saat ini sedang diproses (gunakan promptBuilderService)
    const contextWithoutCurrent = recentMessages.filter((m) => m.id !== userMessage.id);
    const aiContextMessages: AIMessage[] = contextWithoutCurrent.map((m) => ({
      role: m.role as 'user' | 'assistant' | 'system',
      content: m.content,
    }));

    // Tambahkan pesan user saat ini dengan format multimodal/injeksi CSV
    const currentUserAIMessage = promptBuilderService.buildUserMessage(
      content,
      attachment
    );
    aiContextMessages.push(currentUserAIMessage);

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

    // Invalidate cache
    memoryCache.invalidateTag('chat');
    memoryCache.invalidateTag('admin');

    return {
      sessionId: session.id,
      userMessage,
      assistantMessage,
    };
  },

  /**
   * Ambil ringkasan aktivitas chat semua siswa untuk Admin.
   */
  async getAdminOverview(options?: AdminOverviewFilterOptions) {
    return chatRepository.getAdminStudentsChatOverview(options);
  },

  /**
   * Ambil transkrip lengkap satu sesi chat untuk Admin (termasuk lampiran gambar/file).
   */
  async getAdminSessionTranscript(
    sessionId: number,
    options?: { cursor?: number; limit?: number }
  ) {
    const sessionData = await chatRepository.getSessionWithUser(sessionId);
    if (!sessionData) {
      return null;
    }

    if (options?.limit) {
      const paginated = await chatRepository.getPaginatedSessionMessages(
        sessionId,
        options.cursor,
        options.limit
      );
      return {
        session: sessionData.session,
        student: sessionData.user,
        messages: paginated.messages.map((m) => ({
          id: String(m.id),
          sender: m.role === 'assistant' ? ('ai' as const) : ('user' as const),
          text: m.content,
          attachmentUrl: m.attachmentUrl ?? undefined,
          attachmentType: m.attachmentType ?? undefined,
          attachmentName: m.attachmentName ?? undefined,
          createdAt: m.createdAt,
        })),
        pagination: {
          hasMore: paginated.hasMore,
          nextCursor: paginated.nextCursor,
          limit: options.limit,
        },
      };
    }

    const rawMessages = await chatRepository.getAllSessionMessages(sessionId);
    const messages = rawMessages.map((m) => ({
      id: String(m.id),
      sender: m.role === 'assistant' ? ('ai' as const) : ('user' as const),
      text: m.content,
      attachmentUrl: m.attachmentUrl ?? undefined,
      attachmentType: m.attachmentType ?? undefined,
      attachmentName: m.attachmentName ?? undefined,
      createdAt: m.createdAt,
    }));

    return {
      session: sessionData.session,
      student: sessionData.user,
      messages,
      pagination: {
        hasMore: false,
        nextCursor: null,
        limit: messages.length,
      },
    };
  },
};
