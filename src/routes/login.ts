import { Router } from "express";
import { login } from "../controllers/login";
import { valodateLogin } from "../middleware/validationUsers";

const router = Router();

router.post("/login", valodateLogin, login);

export default router;
