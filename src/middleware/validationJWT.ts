import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";

interface IPayload {
  uid: string;
  iat: number;
  exp: number;
}

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");
  console.log(token);
  if (!token) {
    return res.status(401).json({
      msg: "Token dont exist ",
    });
  }
  try {
    const payload = jwt.verify(
      token,
      process.env.SECRETKEY || "token"
    ) as IPayload;
    const user = await User.findOneBy({ id: parseInt(payload.uid) });
    if (!user) {
      return res.status(401).json({
        msg: "user dont exits in DB",
      });
    }
    req.userId = user.id.toString();
    next();
  } catch (error) {
    res.status(401).json({
      msg: "autorization fail",
    });
  }
};
