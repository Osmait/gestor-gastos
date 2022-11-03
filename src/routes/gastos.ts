import { Router } from "express";
import { validateJWT } from "../middleware/validationJWT";

const router = Router();

router.get("/gastos", validateJWT, (_req, res) => {
  res.send("hello");
});

export default router;
