CREATE TABLE IF NOT EXISTS "outbox" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_id" varchar NOT NULL,
	"amount" integer
);
