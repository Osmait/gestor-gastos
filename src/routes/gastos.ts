import { Router } from "express";
import {
  createBill,
  deleteBill,
  getAllBill,
  updateBill,
} from "../controllers/gastos";
import { validateBill } from "../middleware/validationBill";
import { validateJWT } from "../middleware/validationJWT";

const router = Router();
router.get("/gastos", validateJWT, getAllBill);
router.post("/gastos", validateJWT, validateBill, createBill);
router.put("/gastos/:id", validateJWT, validateBill, updateBill);
router.delete("/gastos/:id", validateJWT, deleteBill);

export default router;
