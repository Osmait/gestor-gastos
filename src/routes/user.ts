import { Router } from "express";
import { createUser, getAllUser } from "../controllers/user";

const router = Router();

router.post("/user", createUser);
router.get("/user", getAllUser);

export default router;
