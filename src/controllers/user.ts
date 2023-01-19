import { User } from "../models/User";
import { Request, Response } from "express";
import { encryptPassword } from "../helpers/encryptPassword";
import { CustomRequest } from "../middleware/validationJWT";

interface tokenInterface {
  id: number;
  password: string;
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, password, email } = req.body;

    const user = new User();
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.password = encryptPassword(password);

    await user.save();

    res.status(201).json({
      user,
    });
  } catch (error) {
    res.status(409).json({
      msg: error,
    });
  }
};

export const getAllUser = async (_req: Request, res: Response) => {
  try {
    const user = await User.find();

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(404).json({
      msg: error,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = req.body;

    const userDataBase = await User.findOneBy({ id: parseInt(id) });

    if (!userDataBase) {
      res.status(404).json({
        msg: "user not found",
      });
      return;
    }
    user.password = encryptPassword(user.password);
    await User.update({ id: parseInt(id) }, user);

    res.status(200).json({
      msg: "Update Success ",
      user,
    });
  } catch (error) {
    res.status(404).json({
      msg: error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userDataBase = await User.findOneBy({ id: parseInt(id) });

    if (!userDataBase) {
      res.status(404).json({
        msg: "user not found",
      });
      return;
    }
    await User.delete({ id: parseInt(id) });
    res.status(200).json({
      msg: "removed successfully ",
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
};

export const perfil = async (req: Request, res: Response) => {
  const user = (req as CustomRequest).token as tokenInterface;
  user.password = "";
  res.json(user);
};
