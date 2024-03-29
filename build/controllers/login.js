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
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
const User_1 = require("../models/User");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.User.findOneBy({ email: email });
        if (!user) {
            res.status(404).json({
                msg: "user not found",
            });
            return;
        }
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (user.email !== email || !validPassword) {
            res.status(404).json({
                msg: "Email or password was not correct",
            });
            return;
        }
        //   Generar JWT
        const token = yield (0, jwt_1.default)(user.id.toString());
        user.password = "";
        res.status(200).json({
            user,
            token,
        });
    }
    catch (error) {
        res.status(403).json({
            msg: error,
        });
    }
});
exports.login = login;
