"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const drizzle_kit_1 = require("drizzle-kit");
exports.default = (0, drizzle_kit_1.defineConfig)({
    dialect: 'postgresql',
    schema: './server/db/schema.ts',
    out: './drizzle',
    dbCredentials: {
        url: 'postgres://default:Kf6IOi4XHrlP@ep-mute-paper-a2zwoq0u-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require',
    },
});
