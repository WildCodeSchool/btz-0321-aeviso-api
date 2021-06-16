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

const recordSchema = Joi.object({
  date: Joi.string().isoDate().required(),
  timeslot: Joi.string().valid("MORNING", "AFTERNOON").required(),
  userId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
  projectId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
  comment: Joi.string(),
});

const recordSchemaEdit = Joi.object({
  date: Joi.string().isoDate(),
  timeslot: Joi.string().valid("MORNING", "AFTERNOON"),
  comment: Joi.string(),
});

module.exports = {
  userSchema,
  companySchema,
  companySchemaEdit,
  recordSchema,
  recordSchemaEdit,
};
