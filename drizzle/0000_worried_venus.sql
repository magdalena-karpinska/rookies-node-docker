CREATE TABLE IF NOT EXISTS "outbox" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"data" jsonb NOT NULL
);
