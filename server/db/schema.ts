import { serial, varchar, jsonb, pgTable } from 'drizzle-orm/pg-core';

export const outBoxTable = pgTable('outbox', {
  id: serial('id').primaryKey(),
  name: varchar('name'),
  data: jsonb('data').notNull(),
});
