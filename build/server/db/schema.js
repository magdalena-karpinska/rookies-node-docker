"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outBoxTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.outBoxTable = (0, pg_core_1.pgTable)('outbox', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    data: (0, pg_core_1.jsonb)('data').notNull(),
});
