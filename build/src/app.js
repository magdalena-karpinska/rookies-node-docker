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
    console.log(car_id);
    console.log(amount);
    // if (typeof amount !== "number" || !Number.isInteger(amount)) {
    //   logger.log({
    //     message: "Invalid amount. It must be an integer.",
    //     level: "error",
    //   });
    //   return res
    //     .status(400)
    //     .json({ error: "Invalid amount. It must be an integer." });
    // }
    // try {
    //   await db.transaction(async (tx) => {
    //     // await postPayments(tx, car_id, amount);
    //     await tx
    //       .insert(payments)
    //       .values({ car_id: car_id, amount: amount })
    //       .returning();
    //     console.log("run postPayments");
    //     // await postOutBox(tx, car_id);
    //     await tx.insert(outBoxTable).values({ car_id: car_id }).returning();
    //     console.log("run postOutBox");
    //   });
    // } catch (error) {
    //   console.error("Transaction failed:", error);
    //   logger.error({
    //     message: "Transaction failed",
    //     error: error instanceof Error ? error.message : String(error),
    //   });
    //   return res.status(500).json({ error: "Transaction failed" });
    // }
    try {
        yield db_1.db
            .insert(schema_1.payments)
            .values({ car_id: car_id, amount: amount })
            .returning();
    }
    catch (error) {
        console.error("Failed data insert:", error);
        logger_1.logger.error({
            message: "Transaction failed",
            error: error instanceof Error ? error.message : String(error),
        });
        throw new Error("Failed data insert");
        // return res.status(500).json({ error: "Transaction failed" });
    }
    res.status(200).send("Payment success");
    logger_1.logger.info({
        level: "info",
        message: "Payment processed successfully",
        car_id,
        amount,
    });
}));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
