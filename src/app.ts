import express from "express";
import routerGastos from "./routes/gastos";
import routerIncome from "./routes/income";
import routerLogin from "./routes/login";
import routerUser from "./routes/user";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api", routerGastos);
app.use("/api", routerUser);
app.use("/api", routerLogin);
app.use("/api", routerIncome);

export default app;
