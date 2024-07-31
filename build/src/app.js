"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("./logger");
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.status(200).send('Hello from Index1');
    logger_1.logger.info('Index page!');
});
app.get('/status', (_req, res) => {
    res.status(200).send('Hello from Rookies');
    logger_1.logger.info('Status page!');
});
app.post('/payments', (req, res) => {
    const { carId, amount } = req.body;
    console.log(carId);
    console.log(amount);
    if (typeof amount !== 'number' || !Number.isInteger(amount)) {
        logger_1.logger.log({
            message: 'Invalid amount. It must be an integer.',
            level: 'error',
        });
        return res
            .status(400)
            .json({ error: 'Invalid amount. It must be an integer.' });
    }
    const random = Math.random();
    if (random > 0.5) {
        logger_1.logger.log({
            message: 'Invalid random. It must be less than 0.5.',
            level: 'error',
        });
    }
    res.status(200).json('Payment success');
    logger_1.logger.info({
        level: 'info',
        message: 'Payment processed successfully',
        carId,
        amount,
    });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
