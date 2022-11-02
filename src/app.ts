import express from "express";
import routerGastos from "./routes/gastos";
import routerUser from "./routes/user";

const app = express();

app.use(express.json());

app.use("/api", routerGastos);
app.use("/api", routerUser);

export default app;
