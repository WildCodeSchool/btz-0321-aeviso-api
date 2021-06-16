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

const projectsSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  code: Joi.string().required(),
  companyId: Joi.string().required(),
  taxation: Joi.string(),
});

const authSchema = Joi.object({
  email: Joi.string().required(),
});

module.exports = {
  userSchema,
  projectsSchema,
  authSchema,
};
