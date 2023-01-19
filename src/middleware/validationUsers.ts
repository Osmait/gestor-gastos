import { Request, Response, NextFunction } from "express";
import { loginSchema } from "../schemas/login";
import { userSchema } from "../schemas/userSchema";

interface errorInterfase {
  details: [
    {
      message: string;
    }
  ];
}

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
      msg: (error as errorInterfase).details[0].message,
    });
    return;
  }

  next();
};

export const valodateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const info = req.body;
    await loginSchema.validateAsync(info);
  } catch (error) {
    res.status(404).json({
      msg: (error as errorInterfase).details[0].message,
    });
    return;
  }
  next();
};
