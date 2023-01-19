import Joi from "joi";

const userSchema = Joi.object({
  first_name: Joi.string().required().max(255),

  last_name: Joi.string().required().max(255),

  password: Joi.string().required().min(6),

  email: Joi.string().email().required().max(255),
});

export { userSchema };
