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
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("x-token");
    console.log(token);
    if (!token) {
        return res.status(401).json({
            msg: "Token dont exist ",
        });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRETKEY || "token");
        const user = yield User_1.User.findOneBy({ id: parseInt(payload.uid) });
        if (!user) {
            return res.status(401).json({
                msg: "user dont exits in DB",
            });
        }
        req.token = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            msg: "autorization fail",
        });
    }
});
exports.validateJWT = validateJWT;
