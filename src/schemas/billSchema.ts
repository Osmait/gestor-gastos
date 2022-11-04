import Joi from "joi";

export const billSchema = Joi.object({
  description: Joi.string().required().max(50).min(1),
  amount: Joi.number().required().min(1),
});
