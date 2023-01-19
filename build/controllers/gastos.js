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
exports.deleteBill = exports.updateBill = exports.getAllBill = exports.createBill = void 0;
const Bill_1 = require("../models/Bill");
const createBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, amount } = req.body;
        const user = req.token;
        const bill = new Bill_1.Bill();
        bill.description = description;
        bill.amount = amount;
        bill.user_id = user.id;
        const dato = yield bill.save();
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
exports.createBill = createBill;
const getAllBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.token;
        const bills = yield Bill_1.Bill.query(`SELECT * FROM bill WHERE user_id = ${user.id}`);
        res.status(200).json({
            bills,
        });
    }
    catch (error) {
        res.status(404).json({
            msg: error,
        });
    }
});
exports.getAllBill = getAllBill;
const updateBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, amount } = req.body;
        const { id } = req.params;
        const user = req.token;
        const bill = yield Bill_1.Bill.findOneBy({ id: parseInt(id) });
        if (!bill) {
            return res.status(404).json({
                msg: "Not found",
            });
        }
        if (bill.user_id !== user.id) {
            return res.status(403).json({
                msg: "no auth",
            });
        }
        bill.description = description;
        bill.amount = amount;
        const billDB = yield bill.save();
        res.status(200).json({
            billDB,
        });
    }
    catch (error) {
        res.status(404).json({
            msg: error,
        });
    }
});
exports.updateBill = updateBill;
const deleteBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.token;
        const BillDataBase = yield Bill_1.Bill.findOneBy({ id: parseInt(id) });
        if (!BillDataBase) {
            res.status(404).json({
                msg: "not found",
            });
            return;
        }
        if (BillDataBase.user_id !== user.id) {
            return res.status(403).json({
                msg: "no auth",
            });
        }
        yield Bill_1.Bill.delete({ id: parseInt(id) });
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
exports.deleteBill = deleteBill;
