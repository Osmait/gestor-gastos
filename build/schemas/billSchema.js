"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.billSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.billSchema = joi_1.default.object({
    description: joi_1.default.string().required().max(50).min(1),
    amount: joi_1.default.number().required().min(1),
});
