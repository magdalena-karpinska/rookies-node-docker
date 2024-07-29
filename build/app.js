"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const PayloadSchema = zod_1.z.object({
    carId: zod_1.z.string().uuid(),
    amount: zod_1.z.number().int(),
});
const app = (0, express_1.default)();
const port = 8080;
app.get("/", (req, res) => {
    res.send("Hello from Index").status(200);
});
app.get("/status", (req, res) => {
    res.send("Hello from Rookies").status(200);
});
app.post("/payments", (req, res) => {
    const result = PayloadSchema.safeParse(req.body);
    const { carId, amount } = result.data;
    if (!carId || !amount) {
        res.status(400).send("Invalid request");
    }
    res.status(200).send("Payment success");
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
