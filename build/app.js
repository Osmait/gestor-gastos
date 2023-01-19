"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gastos_1 = __importDefault(require("./routes/gastos"));
const income_1 = __importDefault(require("./routes/income"));
const login_1 = __importDefault(require("./routes/login"));
const user_1 = __importDefault(require("./routes/user"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", gastos_1.default);
app.use("/api", user_1.default);
app.use("/api", login_1.default);
app.use("/api", income_1.default);
exports.default = app;
