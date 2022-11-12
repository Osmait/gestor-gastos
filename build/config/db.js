"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Bill_1 = require("../models/Bill");
const Income_1 = require("../models/Income");
const User_1 = require("../models/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "osmait",
    password: "123456",
    database: "presupuesto",
    entities: [User_1.User, Income_1.Income, Bill_1.Bill],
    synchronize: false,
    logging: true,
    migrations: [],
});
