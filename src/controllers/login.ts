import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import generarJWT from "../helpers/jwt";
import { User } from "../models/User";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOneBy({ email: email });
  console.log(user);

  if (!user) {
    res.status(404).json({
      msg: "user not found",
    });
    return;
  }

  const validPassword = bcrypt.compareSync(password, user.password);

  if (user.email !== email || !validPassword) {
    res.status(404).json({
      msg: "Email or password was not correct",
    });
  }
  //   Generar JWT
  const token = await generarJWT(user.id.toString());

  res.status(200).json({
    token,
  });
};
