"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = require("../controllers/login");
const validationUsers_1 = require("../middleware/validationUsers");
const router = (0, express_1.Router)();
router.post("/login", validationUsers_1.valodateLogin, login_1.login);
exports.default = router;
