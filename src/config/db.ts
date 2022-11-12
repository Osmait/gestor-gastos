import { DataSource } from "typeorm";
import { Bill } from "../models/Bill";
import { Income } from "../models/Income";
import { User } from "../models/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "containers-us-west-74.railway.app",
  port: 7435,
  username: "postgres",
  password: "OVTZ9smbWIuNNh53LGfq",
  database: "railway",
  entities: [User, Income, Bill],
  synchronize: true,
  logging: true,
  migrations: [],
});
