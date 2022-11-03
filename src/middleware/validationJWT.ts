import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
// import { User } from "../models/User";

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "Token dont exist ",
    });
  }
  try {
    const data = jwt.verify(token, "3st03sm1Piblick3");
    console.log(data.length());
    next();
  } catch (error) {
    res.status(401).json({
      msg: "autorization fail",
    });
  }
};
