import { DataSource } from "typeorm";
import { Bill } from "../models/Bill";
import { Income } from "../models/Income";
import { User } from "../models/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST!,
  port: parseInt(process.env.PORT_DATABASE!),
  username: process.env.USER!,
  password: process.env.PASSWORD!,
  database: process.env.DATABASE!,
  entities: [User, Income, Bill],
  synchronize: false,
  logging: true,
  migrations: [],
});
