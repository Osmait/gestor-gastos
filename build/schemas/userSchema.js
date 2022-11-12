"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    first_name: joi_1.default.string().required().max(255),
    last_name: joi_1.default.string().required().max(255),
    password: joi_1.default.string().required().min(6),
    email: joi_1.default.string().email().required().max(255),
});
exports.userSchema = userSchema;
