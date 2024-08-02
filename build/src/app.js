"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("./logger");
const db_1 = require("../server/db");
const schema_1 = require("../server/db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.status(200).send("Hello from Index1");
    logger_1.logger.info("Index page!");
});
app.get("/status", (_req, res) => {
    res.status(200).send("Hello from Rookies");
    logger_1.logger.info("Status page!");
});
app.post("/payments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { car_id, amount } = req.body;
    if (typeof amount !== "number") {
        logger_1.logger.log({
            message: "Invalid amount. It must be an integer.",
            level: "error",
        });
        return res
            .status(400)
            .json({ error: "Invalid amount. It must be an integer." });
    }
    if (!car_id.trim()) {
        return res.status(400).json({ error: "Car ID is required" });
    }
    try {
        yield db_1.db.transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            yield tx
                .insert(schema_1.payments)
                .values({ car_id: car_id, amount: amount })
                .returning();
            yield tx.insert(schema_1.outBoxTable).values({ car_id: car_id }).returning();
        }));
        const randomNumber = Math.random();
        if (randomNumber > 0.5) {
            console.error("Payment failed");
        }
        const response = yield fetch("https://rookies-warehouse-ynorbbawua-lz.a.run.app/warehouse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ car_id }),
        });
        if (!response.ok) {
            return res.status(500).json({ error: "Transaction failed" });
        }
        yield db_1.db.delete(schema_1.outBoxTable).where((0, drizzle_orm_1.eq)(car_id, car_id)).returning();
        console.log("Car object deleted from the outBoxTable");
        res.status(200).send("Payment success");
        logger_1.logger.info({
            level: "info",
            message: "Payment processed successfully",
            car_id,
            amount,
        });
    }
    catch (error) {
        console.error("Transaction failed:", error);
        logger_1.logger.error({
            message: "Transaction failed",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
