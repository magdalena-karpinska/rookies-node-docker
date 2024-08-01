CREATE TABLE IF NOT EXISTS "outbox" (
	"id" serial PRIMARY KEY NOT NULL,
	"statusText" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"carId" varchar NOT NULL,
	"amount" integer
);
