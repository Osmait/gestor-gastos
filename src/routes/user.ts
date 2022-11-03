import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  updateUser,
} from "../controllers/user";
import { validateInfo } from "../middleware/validationUsers";

const router = Router();

router.post("/user", validateInfo, createUser);
router.get("/user", getAllUser);
router.put("/user/:id", validateInfo, updateUser);
router.delete("/user/:id", deleteUser);

export default router;
