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
exports.deleteincome = exports.updateincome = exports.getAllincome = exports.createincome = void 0;
const Income_1 = require("../models/Income");
const createincome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, amount } = req.body;
        const user = req.token;
        const income = new Income_1.Income();
        income.description = description;
        income.amount = amount;
        income.user_id = user.id;
        const dato = yield income.save();
        res.status(201).json({
            dato,
        });
    }
    catch (error) {
        res.status(404).json({
            msg: error,
        });
    }
});
exports.createincome = createincome;
const getAllincome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.token;
        const income = yield Income_1.Income.query(`SELECT * FROM income WHERE user_id = ${user.id}`);
        res.status(200).json({
            income,
        });
    }
    catch (error) {
        res.status(404).json({
            msg: error,
        });
    }
});
exports.getAllincome = getAllincome;
const updateincome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, amount } = req.body;
        const { id } = req.params;
        const user = req.token;
        const income = yield Income_1.Income.findOneBy({ id: parseInt(id) });
        if (!income) {
            return res.status(404).json({
                msg: "Not found",
            });
        }
        if (income.user_id !== user.id) {
            return res.status(403).json({
                msg: "no auth",
            });
        }
        income.description = description;
        income.amount = amount;
        const incomeDB = yield income.save();
        res.status(200).json({
            incomeDB,
        });
    }
    catch (error) {
        res.status(404).json({
            msg: error,
        });
    }
});
exports.updateincome = updateincome;
const deleteincome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.token;
        const incomeDataBase = yield Income_1.Income.findOneBy({ id: parseInt(id) });
        if (!incomeDataBase) {
            res.status(404).json({
                msg: "not found",
            });
            return;
        }
        if (incomeDataBase.user_id !== user.id) {
            return res.status(403).json({
                msg: "no auth",
            });
        }
        yield Income_1.Income.delete({ id: parseInt(id) });
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
exports.deleteincome = deleteincome;
