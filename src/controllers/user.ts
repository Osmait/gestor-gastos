import { User } from "../models/User";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  const { first_name, last_name, password, email } = req.body;

  const user = new User();
  user.first_name = first_name;
  user.last_name = last_name;
  user.password = password;
  user.email = email;
  await user.save();

  res.status(201).json({
    user,
  });
};

export const getAllUser = async (_req: Request, res: Response) => {
  const user = await User.find();

  res.status(200).json({
    user,
  });
};
