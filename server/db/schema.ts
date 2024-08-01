import { serial, pgTable, integer, varchar, text } from "drizzle-orm/pg-core";

export const outBoxTable = pgTable("outbox", {
  id: serial("id").primaryKey(),
  carId: varchar("carId").notNull(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  carId: varchar("carId").notNull(),
  amount: integer("amount"),
});
