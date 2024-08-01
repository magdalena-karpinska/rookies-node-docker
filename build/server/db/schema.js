"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payments = exports.outBoxTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.outBoxTable = (0, pg_core_1.pgTable)("outbox", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    carId: (0, pg_core_1.varchar)("carId").notNull(),
});
exports.payments = (0, pg_core_1.pgTable)("payments", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    carId: (0, pg_core_1.varchar)("carId").notNull(),
    amount: (0, pg_core_1.integer)("amount"),
});
