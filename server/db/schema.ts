import { PgTable, serial, jsonb, pgTable } from 'drizzle-orm/pg-core';

export const outBoxTable = pgTable('outbox', {
  id: serial('id').primaryKey(),
  data: jsonb('data').notNull(),
});
