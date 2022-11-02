import { DataSource } from "typeorm";
import { Bill } from "../models/Bill";
import { Income } from "../models/Income";
import { User } from "../models/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "osmait",
  password: "123456",
  database: "presupuesto",
  entities: [User, Income, Bill],
  synchronize: false,
  logging: true,
  migrations: [],
});
