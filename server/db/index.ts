import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

const dbUrl =
  "postgres://default:Kf6IOi4XHrlP@ep-mute-paper-a2zwoq0u-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require";

if (!dbUrl) {
  throw new Error("Missing DB_URL.");
}

const client = postgres(dbUrl);

export const db = drizzle(client, { schema, logger: true });
