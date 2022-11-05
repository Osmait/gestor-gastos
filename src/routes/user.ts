import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  perfil,
  updateUser,
} from "../controllers/user";
import { validateJWT } from "../middleware/validationJWT";
import { validateInfo } from "../middleware/validationUsers";

const router = Router();

router.post("/user", validateInfo, createUser);
router.get("/user", getAllUser);
router.put("/user/:id", validateInfo, updateUser);
router.delete("/user/:id", deleteUser);

router.get("/perfil", validateJWT, perfil);

export default router;
