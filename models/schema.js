const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.number().required(),
});
