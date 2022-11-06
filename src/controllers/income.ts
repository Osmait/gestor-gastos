import { Request, Response } from "express";
import { Income } from "../models/Income";
import { CustomRequest } from "../middleware/validationJWT";

interface tokenInterface {
  id: number;
}

export const createincome = async (req: Request, res: Response) => {
  try {
    const { description, amount } = req.body;
    const user = (req as CustomRequest).token as tokenInterface;

    const income = new Income();
    income.description = description;
    income.amount = amount;
    income.user_id = user.id;
    income.save();

    res.status(201).json({
      income,
    });
  } catch (error) {
    res.status(404).json({
      msg: error,
    });
  }
};

export const getAllincome = async (req: Request, res: Response) => {
  try {
    const user = (req as CustomRequest).token as tokenInterface;

    const income = await Income.query(
      `SELECT * FROM income WHERE user_id = ${user.id}`
    );

    res.status(200).json({
      income,
    });
  } catch (error) {
    res.status(404).json({
      msg: error,
    });
  }
};

export const updateincome = async (req: Request, res: Response) => {
  try {
    const { description, amount } = req.body;
    const { id } = req.params;
    const user = (req as CustomRequest).token as tokenInterface;
    const income = await Income.findOneBy({ id: parseInt(id) });
    if (!income) {
      return res.status(404).json({
        msg: "Not found",
      });
    }
    if (income.user_id !== user.id) {
      return res.status(403).json({
        msg: "no auth",
      });
    }
    income.description = description;
    income.amount = amount;
    income.save();
    res.status(200).json({
      msg: "Update Success ",
    });
  } catch (error) {
    res.status(404).json({
      msg: error,
    });
  }
};

export const deleteincome = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = (req as CustomRequest).token as tokenInterface;

    const incomeDataBase = await Income.findOneBy({ id: parseInt(id) });

    if (!incomeDataBase) {
      res.status(404).json({
        msg: "not found",
      });
      return;
    }

    if (incomeDataBase.user_id !== user.id) {
      return res.status(403).json({
        msg: "no auth",
      });
    }
    await Income.delete({ id: parseInt(id) });
    res.status(200).json({
      msg: "removed successfully ",
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
};
