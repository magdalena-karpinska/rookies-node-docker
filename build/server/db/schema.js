"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payments = exports.outBoxTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.outBoxTable = (0, pg_core_1.pgTable)("outbox", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    car_id: (0, pg_core_1.varchar)("car_id").notNull(),
});
exports.payments = (0, pg_core_1.pgTable)("payments", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    car_id: (0, pg_core_1.varchar)("car_id").notNull(),
    amount: (0, pg_core_1.integer)("amount"),
});
