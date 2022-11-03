import { Request, Response, NextFunction } from "express";
import { userSchema } from "../schemas/userSchema";

export const validateInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const info = req.body;
    await userSchema.validateAsync(info);
  } catch (error) {
    res.status(404).json({
      msg: error,
    });
    return;
  }

  next();
};
