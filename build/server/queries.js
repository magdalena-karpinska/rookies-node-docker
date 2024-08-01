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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postOutBox = exports.postPayments = void 0;
const schema_1 = require("./db/schema");
const postPayments = (tx, carId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    yield tx.insert(schema_1.payments).values({ carId: carId, amount: amount });
});
exports.postPayments = postPayments;
const postOutBox = (tx, carId) => __awaiter(void 0, void 0, void 0, function* () {
    yield tx.insert(schema_1.outBoxTable).values({ carId: carId });
});
exports.postOutBox = postOutBox;
