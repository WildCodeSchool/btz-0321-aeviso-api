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

const companySchema = Joi.object({
  name: Joi.string().required(),
  logoUrl: Joi.string().uri(),
});

const companySchemaEdit = Joi.object({
  name: Joi.string(),
  logoUrl: Joi.string().uri(),
});

module.exports = {
  userSchema,
  companySchema,
  companySchemaEdit,
};
