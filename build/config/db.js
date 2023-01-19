"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Bill_1 = require("../models/Bill");
const Income_1 = require("../models/Income");
const User_1 = require("../models/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: process.env.PORT_DATABASE,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [User_1.User, Income_1.Income, Bill_1.Bill],
    synchronize: true,
    logging: true,
    migrations: [],
});
