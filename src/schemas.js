const Joi = require("joi");

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  jobId: Joi.string().required(),
  companyId: Joi.string(),
  password: Joi.string(),
  role: Joi.string(),
  weeklyBasis: Joi.string(),
});

module.exports = {
  userSchema,
};
