ALTER TABLE "outbox" ADD COLUMN "carId" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "outbox" DROP COLUMN IF EXISTS "statusText";