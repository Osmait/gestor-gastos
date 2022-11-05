import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required().max(255),
  password: Joi.string().required().min(6),
});
