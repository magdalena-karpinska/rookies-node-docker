import { serial, pgTable, integer, varchar, text } from "drizzle-orm/pg-core";

export const outBoxTable = pgTable("outbox", {
  id: serial("id").primaryKey(),
  car_id: varchar("car_id").notNull(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  car_id: varchar("car_id").notNull(),
  amount: integer("amount"),
});
