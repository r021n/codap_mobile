import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey(),
  fullName: text('full_name').notNull(),
  username: text('username').unique().notNull(),
  password: text('password').notNull(),
  gender: text('gender').notNull(),
  age: integer('age').notNull(),
  className: text('class_name').notNull(),
  attendanceNumber: integer('attendance_number').notNull(),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
