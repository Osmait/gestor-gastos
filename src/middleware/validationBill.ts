import { Request, Response, NextFunction } from "express";
import { billSchema } from "../schemas/billSchema";

interface errorInterfase {
  details: [
    {
      message: string;
    }
  ];
}

export const validateBill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bill = req.body;
    await billSchema.validateAsync(bill);
  } catch (error) {
    res.status(404).json({
      msg: (error as errorInterfase).details[0].message,
    });
    return;
  }

  next();
};
