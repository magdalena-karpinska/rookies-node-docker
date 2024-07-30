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
const logging_bunyan_1 = __importDefault(require("@google-cloud/logging-bunyan"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { logger, mw } = yield logging_bunyan_1.default.express.middleware({
                logName: "samples_express",
            });
            const app = (0, express_1.default)();
            const port = 8080;
            app.use(express_1.default.json());
            app.use(mw);
            app.get("/", (req, res) => {
                res.status(200).send("Hello from Index1");
                logger.info("Visited index page");
            });
            app.get("/status", (req, res) => {
                res.status(200).send("Hello from Rookies");
            });
            app.post("/payments", (req, res) => {
                const { carId, amount } = req.body;
                console.log(carId);
                console.log(amount);
                logger.info("Payment received:");
                res.status(200).json("Payment success");
            });
            app.listen(port, () => {
                console.log(`Example app listening at http://localhost:${port}`);
                logger.info(`Server started at http://localhost:${port}`);
            });
        }
        catch (error) {
            console.error("Error initializing server:", error);
        }
    });
}
startServer();
