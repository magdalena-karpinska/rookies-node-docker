import { serial, jsonb, pgTable, integer } from 'drizzle-orm/pg-core';

export const outBoxTable = pgTable('outbox', {
  id: serial('id').primaryKey(),
  data: jsonb('data').notNull(),
});

export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  carId: serial('id'),
  amount: integer('amount'),
});
