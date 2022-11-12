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
exports.perfil = exports.deleteUser = exports.updateUser = exports.getAllUser = exports.createUser = void 0;
const User_1 = require("../models/User");
const encryptPassword_1 = require("../helpers/encryptPassword");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, password, email } = req.body;
        const user = new User_1.User();
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
        user.password = (0, encryptPassword_1.encryptPassword)(password);
        yield user.save();
        res.status(201).json({
            user,
        });
    }
    catch (error) {
        res.status(409).json({
            msg: error,
        });
    }
});
exports.createUser = createUser;
const getAllUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.find();
        res.status(200).json({
            user,
        });
    }
    catch (error) {
        res.status(404).json({
            msg: error,
        });
    }
});
exports.getAllUser = getAllUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.body;
        const userDataBase = yield User_1.User.findOneBy({ id: parseInt(id) });
        if (!userDataBase) {
            res.status(404).json({
                msg: "user not found",
            });
            return;
        }
        user.password = (0, encryptPassword_1.encryptPassword)(user.password);
        yield User_1.User.update({ id: parseInt(id) }, user);
        res.status(200).json({
            msg: "Update Success ",
            user,
        });
    }
    catch (error) {
        res.status(404).json({
            msg: error,
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userDataBase = yield User_1.User.findOneBy({ id: parseInt(id) });
        if (!userDataBase) {
            res.status(404).json({
                msg: "user not found",
            });
            return;
        }
        yield User_1.User.delete({ id: parseInt(id) });
        res.status(200).json({
            msg: "removed successfully ",
        });
    }
    catch (error) {
        res.status(404).json({
            error,
        });
    }
});
exports.deleteUser = deleteUser;
const perfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.token;
    user.password = "";
    res.json(user);
});
exports.perfil = perfil;
