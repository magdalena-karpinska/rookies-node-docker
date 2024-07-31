CREATE TABLE IF NOT EXISTS "payments" (
	"id" serial NOT NULL,
	"amount" integer
);
--> statement-breakpoint
ALTER TABLE "outbox" DROP COLUMN IF EXISTS "name";