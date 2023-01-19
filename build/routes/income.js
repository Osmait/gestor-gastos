"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const income_1 = require("../controllers/income");
const validationBill_1 = require("../middleware/validationBill");
const validationJWT_1 = require("../middleware/validationJWT");
const router = (0, express_1.Router)();
router.get("/income", validationJWT_1.validateJWT, income_1.getAllincome);
router.post("/income", validationJWT_1.validateJWT, validationBill_1.validateBill, income_1.createincome);
router.put("/income/:id", validationJWT_1.validateJWT, validationBill_1.validateBill, income_1.updateincome);
router.delete("/income/:id", validationJWT_1.validateJWT, income_1.deleteincome);
exports.default = router;
