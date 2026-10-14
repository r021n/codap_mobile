import { eq, and, desc, asc, sql, lt, like, or, inArray } from 'drizzle-orm';
import { db } from './index.js';
import {
  chatSessionsTable,
  chatMessagesTable,
  usersTable,
  type SelectChatSession,
  type SelectChatMessage,
} from './schema.js';

export interface AdminOverviewFilterOptions {
  page?: number;
  limit?: number;
  search?: string;
  className?: string;
  all?: boolean;
}

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
    content: string,
    attachment?: {
      url?: string | null;
      type?: 'image' | 'text' | null;
      name?: string | null;
    }
  ): Promise<SelectChatMessage> {
    const [saved] = await db
      .insert(chatMessagesTable)
      .values({
        sessionId,
        role,
        content,
        attachmentUrl: attachment?.url ?? null,
        attachmentType: attachment?.type ?? null,
        attachmentName: attachment?.name ?? null,
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
   * Ambil riwayat pesan dalam satu sesi dengan cursor-based pagination.
   */
  async getPaginatedSessionMessages(
    sessionId: number,
    cursor?: number,
    limit = 20
  ): Promise<{ messages: SelectChatMessage[]; nextCursor: number | null; hasMore: boolean }> {
    const conditions = [eq(chatMessagesTable.sessionId, sessionId)];
    if (cursor) {
      conditions.push(lt(chatMessagesTable.id, cursor));
    }

    const fetched = await db
      .select()
      .from(chatMessagesTable)
      .where(and(...conditions))
      .orderBy(desc(chatMessagesTable.id))
      .limit(limit + 1);

    const hasMore = fetched.length > limit;
    const items = hasMore ? fetched.slice(0, limit) : fetched;
    const nextCursor = hasMore && items.length > 0 ? items[items.length - 1].id : null;

    // Balik urutan agar kronologis (lama -> baru)
    return {
      messages: items.reverse(),
      nextCursor,
      hasMore,
    };
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
   * Mendukung pagination, pencarian nama, dan filter kelas.
   */
  async getAdminStudentsChatOverview(options?: AdminOverviewFilterOptions) {
    const page = Math.max(1, options?.page || 1);
    const limit = options?.limit ? Math.max(1, options.limit) : 15;
    const search = options?.search?.trim();
    const className = options?.className?.trim();
    const all = options?.all === true;

    // Filter conditions
    const studentConditions = [eq(usersTable.status, 'student')];
    if (className) {
      studentConditions.push(eq(usersTable.className, className));
    }
    if (search) {
      const searchPattern = `%${search}%`;
      studentConditions.push(
        or(
          like(usersTable.fullName, searchPattern),
          like(usersTable.username, searchPattern)
        )!
      );
    }

    const whereClause = and(...studentConditions);

    // Hitung total records
    const [countResult] = await db
      .select({ total: sql<number>`count(*)` })
      .from(usersTable)
      .where(whereClause);

    const totalRecords = Number(countResult?.total || 0);
    const totalPages = all ? 1 : Math.ceil(totalRecords / limit) || 1;

    // Ambil data siswa
    let studentQuery = db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        username: usersTable.username,
        className: usersTable.className,
      })
      .from(usersTable)
      .where(whereClause)
      .orderBy(asc(usersTable.fullName));

    if (!all) {
      const offset = (page - 1) * limit;
      studentQuery = studentQuery.limit(limit).offset(offset) as typeof studentQuery;
    }

    const students = await studentQuery;
    if (students.length === 0) {
      return {
        students: [],
        pagination: {
          page,
          limit: all ? 0 : limit,
          totalRecords,
          totalPages,
          hasMore: false,
        },
      };
    }

    const studentIds = students.map((s) => s.id);

    // Ambil sesi hanya untuk siswa yang ada di halaman ini
    const sessions = await db
      .select()
      .from(chatSessionsTable)
      .where(inArray(chatSessionsTable.userId, studentIds))
      .orderBy(desc(chatSessionsTable.updatedAt));

    const sessionIds = sessions.map((s) => s.id);
    const messageCountMap = new Map<number, number>();

    if (sessionIds.length > 0) {
      const messageCounts = await db
        .select({
          sessionId: chatMessagesTable.sessionId,
          count: sql<number>`count(*)`.as('count'),
        })
        .from(chatMessagesTable)
        .where(inArray(chatMessagesTable.sessionId, sessionIds))
        .groupBy(chatMessagesTable.sessionId);

      for (const item of messageCounts) {
        messageCountMap.set(item.sessionId, Number(item.count));
      }
    }

    const studentsData = students.map((student) => {
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

    return {
      students: studentsData,
      pagination: {
        page,
        limit: all ? totalRecords : limit,
        totalRecords,
        totalPages,
        hasMore: page < totalPages,
      },
    };
  },
};

