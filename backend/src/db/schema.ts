import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, primaryKey, index } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey(),
  fullName: text('full_name').notNull(),
  username: text('username').unique().notNull(),
  password: text('password').notNull(),
  gender: text('gender').notNull(),
  age: integer('age').notNull(),
  className: text('class_name').notNull(),
  attendanceNumber: integer('attendance_number').notNull(),
  status: text('status').$type<'admin' | 'student'>().notNull().default('student'),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export const userProgressTable = sqliteTable('user_progress', {
  userId: integer('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  pageName: text('page_name').notNull(),
  completedAt: text('completed_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.userId, table.pageName] }),
  };
});

export type InsertUserProgress = typeof userProgressTable.$inferInsert;
export type SelectUserProgress = typeof userProgressTable.$inferSelect;

export const chatSessionsTable = sqliteTable('chat_sessions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  moduleKey: text('module_key').notNull(),
  isArchived: integer('is_archived', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
}, (table) => {
  return {
    userModuleActiveIdx: index('idx_chat_sessions_user_module_archived').on(
      table.userId,
      table.moduleKey,
      table.isArchived
    ),
    userUpdatedIdx: index('idx_chat_sessions_user_updated').on(table.userId, table.updatedAt),
  };
});

export type InsertChatSession = typeof chatSessionsTable.$inferInsert;
export type SelectChatSession = typeof chatSessionsTable.$inferSelect;

export const chatMessagesTable = sqliteTable('chat_messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sessionId: integer('session_id')
    .notNull()
    .references(() => chatSessionsTable.id, { onDelete: 'cascade' }),
  role: text('role').$type<'user' | 'assistant' | 'system'>().notNull(),
  content: text('content').notNull(),
  attachmentUrl: text('attachment_url'),
  attachmentType: text('attachment_type').$type<'image' | 'text'>(),
  attachmentName: text('attachment_name'),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
}, (table) => {
  return {
    sessionCreatedIdx: index('idx_chat_messages_session_created').on(
      table.sessionId,
      table.createdAt
    ),
  };
});

export type InsertChatMessage = typeof chatMessagesTable.$inferInsert;
export type SelectChatMessage = typeof chatMessagesTable.$inferSelect;


