import { eq, and, desc, asc, sql } from 'drizzle-orm';
import { db } from './index.js';
import {
  chatSessionsTable,
  chatMessagesTable,
  usersTable,
  type SelectChatSession,
  type SelectChatMessage,
} from './schema.js';

export const chatRepository = {
  /**
   * Cari sesi aktif (isArchived = false) untuk kombinasi user dan moduleKey tertentu.
   */
  async getActiveSession(userId: number, moduleKey: string): Promise<SelectChatSession | null> {
    const session = await db
      .select()
      .from(chatSessionsTable)
      .where(
        and(
          eq(chatSessionsTable.userId, userId),
          eq(chatSessionsTable.moduleKey, moduleKey),
          eq(chatSessionsTable.isArchived, false)
        )
      )
      .orderBy(desc(chatSessionsTable.createdAt))
      .get();

    return session ?? null;
  },

  /**
   * Buat sesi chat baru.
   */
  async createSession(userId: number, moduleKey: string): Promise<SelectChatSession> {
    const [newSession] = await db
      .insert(chatSessionsTable)
      .values({
        userId,
        moduleKey,
        isArchived: false,
      })
      .returning();

    return newSession;
  },

  /**
   * Ambil sesi aktif yang sudah ada, atau buat baru jika belum ada.
   */
  async getOrCreateActiveSession(userId: number, moduleKey: string): Promise<SelectChatSession> {
    const active = await this.getActiveSession(userId, moduleKey);
    if (active) return active;
    return this.createSession(userId, moduleKey);
  },

  /**
   * Soft-delete: Tandai sesi aktif sebagai diarsipkan (isArchived = true).
   */
  async archiveActiveSession(userId: number, moduleKey: string): Promise<boolean> {
    const result = await db
      .update(chatSessionsTable)
      .set({
        isArchived: true,
        updatedAt: sql`(CURRENT_TIMESTAMP)`,
      })
      .where(
        and(
          eq(chatSessionsTable.userId, userId),
          eq(chatSessionsTable.moduleKey, moduleKey),
          eq(chatSessionsTable.isArchived, false)
        )
      );

    return result.rowsAffected > 0;
  },

  /**
   * Simpan satu pesan ke sesi tertentu dan perbarui waktu updatedAt pada sesi.
   */
  async saveMessage(
    sessionId: number,
    role: 'user' | 'assistant' | 'system',
    content: string
  ): Promise<SelectChatMessage> {
    const [saved] = await db
      .insert(chatMessagesTable)
      .values({
        sessionId,
        role,
        content,
      })
      .returning();

    await db
      .update(chatSessionsTable)
      .set({ updatedAt: sql`(CURRENT_TIMESTAMP)` })
      .where(eq(chatSessionsTable.id, sessionId));

    return saved;
  },

  /**
   * Ambil sliding-window pesan terakhir untuk konteks AI LLM (default: 8 pesan terakhir).
   */
  async getRecentMessages(sessionId: number, limit = 8): Promise<SelectChatMessage[]> {
    const messages = await db
      .select()
      .from(chatMessagesTable)
      .where(eq(chatMessagesTable.sessionId, sessionId))
      .orderBy(desc(chatMessagesTable.createdAt))
      .limit(limit);

    // Balik urutan agar kronologis (lama -> baru) saat dikirim ke LLM
    return messages.reverse();
  },

  /**
   * Ambil seluruh riwayat pesan dalam satu sesi tertentu secara berurutan.
   */
  async getAllSessionMessages(sessionId: number): Promise<SelectChatMessage[]> {
    return db
      .select()
      .from(chatMessagesTable)
      .where(eq(chatMessagesTable.sessionId, sessionId))
      .orderBy(asc(chatMessagesTable.createdAt));
  },

  /**
   * Ambil detail sesi berdasarkan sessionId beserta data profil siswa.
   */
  async getSessionWithUser(sessionId: number) {
    const session = await db
      .select()
      .from(chatSessionsTable)
      .where(eq(chatSessionsTable.id, sessionId))
      .get();

    if (!session) return null;

    const user = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        username: usersTable.username,
        className: usersTable.className,
      })
      .from(usersTable)
      .where(eq(usersTable.id, session.userId))
      .get();

    return { session, user };
  },

  /**
   * Ambil ringkasan seluruh siswa beserta sesi-sesi chat mereka (Aktif & Arsip) untuk Admin.
   */
  async getAdminStudentsChatOverview() {
    // Ambil seluruh siswa (hanya status student)
    const students = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        username: usersTable.username,
        className: usersTable.className,
      })
      .from(usersTable)
      .where(eq(usersTable.status, 'student'))
      .orderBy(asc(usersTable.fullName));

    // Ambil seluruh sesi
    const sessions = await db
      .select()
      .from(chatSessionsTable)
      .orderBy(desc(chatSessionsTable.updatedAt));

    // Ambil jumlah pesan per sesi
    const messageCounts = await db
      .select({
        sessionId: chatMessagesTable.sessionId,
        count: sql<number>`count(*)`.as('count'),
      })
      .from(chatMessagesTable)
      .groupBy(chatMessagesTable.sessionId);

    const messageCountMap = new Map<number, number>();
    for (const item of messageCounts) {
      messageCountMap.set(item.sessionId, Number(item.count));
    }

    // Gabungkan data
    return students.map((student) => {
      const studentSessions = sessions
        .filter((s) => s.userId === student.id)
        .map((s) => ({
          id: s.id,
          moduleKey: s.moduleKey,
          isArchived: Boolean(s.isArchived),
          createdAt: s.createdAt,
          updatedAt: s.updatedAt,
          messageCount: messageCountMap.get(s.id) || 0,
        }));

      const totalMessages = studentSessions.reduce((acc, curr) => acc + curr.messageCount, 0);

      return {
        ...student,
        sessions: studentSessions,
        totalSessions: studentSessions.length,
        totalMessages,
        lastActive: studentSessions[0]?.updatedAt || null,
      };
    });
  },
};
