"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gastos_1 = require("../controllers/gastos");
const validationBill_1 = require("../middleware/validationBill");
const validationJWT_1 = require("../middleware/validationJWT");
const router = (0, express_1.Router)();
router.get("/gastos", validationJWT_1.validateJWT, gastos_1.getAllBill);
router.post("/gastos/", validationJWT_1.validateJWT, gastos_1.createBill);
router.put("/gastos/:id", validationJWT_1.validateJWT, validationBill_1.validateBill, gastos_1.updateBill);
router.delete("/gastos/:id", validationJWT_1.validateJWT, gastos_1.deleteBill);
exports.default = router;