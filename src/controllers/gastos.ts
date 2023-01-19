import { Request, Response } from "express";
import { Bill } from "../models/Bill";
import { CustomRequest } from "../middleware/validationJWT";

interface tokenInterface {
  id: number;
}

export const createBill = async (req: Request, res: Response) => {
  try {
    const { description, amount } = req.body;
    const user = (req as CustomRequest).token as tokenInterface;

    const bill = new Bill();
    bill.description = description;
    bill.amount = amount;
    bill.user_id = user.id;
    const dato = await bill.save();

    res.status(201).json({
      dato,
    });
  } catch (error) {
    res.status(404).json({
      msg: error,
    });
  }
};

export const getAllBill = async (req: Request, res: Response) => {
  try {
    const user = (req as CustomRequest).token as tokenInterface;

    const bills = await Bill.query(
      `SELECT * FROM bill WHERE user_id = ${user.id}`
    );

    res.status(200).json({
      bills,
    });
  } catch (error) {
    res.status(404).json({
      msg: error,
    });
  }
};

export const updateBill = async (req: Request, res: Response) => {
  try {
    const { description, amount } = req.body;
    const { id } = req.params;
    const user = (req as CustomRequest).token as tokenInterface;
    const bill = await Bill.findOneBy({ id: parseInt(id) });
    if (!bill) {
      return res.status(404).json({
        msg: "Not found",
      });
    }
    if (bill.user_id !== user.id) {
      return res.status(403).json({
        msg: "no auth",
      });
    }
    bill.description = description;
    bill.amount = amount;
    const billDB = await bill.save();
    res.status(200).json({
      billDB,
    });
  } catch (error) {
    res.status(404).json({
      msg: error,
    });
  }
};

export const deleteBill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = (req as CustomRequest).token as tokenInterface;

    const BillDataBase = await Bill.findOneBy({ id: parseInt(id) });

    if (!BillDataBase) {
      res.status(404).json({
        msg: "not found",
      });
      return;
    }

    if (BillDataBase.user_id !== user.id) {
      return res.status(403).json({
        msg: "no auth",
      });
    }
    await Bill.delete({ id: parseInt(id) });
    res.status(200).json({
      msg: "removed successfully ",
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
};
