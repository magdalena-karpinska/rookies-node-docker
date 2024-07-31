"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, label, printf, colorize, json, prettyPrint } = winston_1.default.format;
exports.logger = winston_1.default.createLogger({
    level: 'info', // Set the default log level
    format: winston_1.default.format.json(),
    transports: [
        // Log to the console
        new winston_1.default.transports.Console({
            format: colorize(),
        }),
    ],
});
