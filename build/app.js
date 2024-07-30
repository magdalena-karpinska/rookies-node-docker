"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).send("Hello from Index1");
});
app.get("/status", (req, res) => {
    res.status(200).send("Hello from Rookies");
});
app.post("/payments", (req, res) => {
    const { carId, amount } = req.body;
    console.log(carId);
    console.log(amount);
    res.status(200).json("Payment success");
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
