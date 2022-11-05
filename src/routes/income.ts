import { Router } from "express";

import {
  createincome,
  deleteincome,
  getAllincome,
  updateincome,
} from "../controllers/income";

import { validateBill } from "../middleware/validationBill";
import { validateJWT } from "../middleware/validationJWT";

const router = Router();
router.get("/income", validateJWT, getAllincome);
router.post("/income", validateJWT, validateBill, createincome);
router.put("/income/:id", validateJWT, validateBill, updateincome);
router.delete("/income/:id", validateJWT, deleteincome);

export default router;
