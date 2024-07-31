import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  dialect: 'postgresql',
  schema: './server/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: 'postgres://default:Kf6IOi4XHrlP@ep-mute-paper-a2zwoq0u-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require',
  },
});
