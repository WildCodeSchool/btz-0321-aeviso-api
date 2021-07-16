const Joi = require("joi");

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  jobId: Joi.string().required(),
  companyId: Joi.string(),
  password: Joi.string().required(),
  role: Joi.string(),
  weeklyBasis: Joi.string(),
});

const putUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  jobId: Joi.string().required(),
  companyId: Joi.string(),
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

const projectsSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  code: Joi.string().required(),
  companyId: Joi.string().required(),
  taxation: Joi.string(),
});

const authSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const jobSchema = Joi.object({
  label: Joi.string().min(2).required(),
});

module.exports = {
  userSchema,
  putUserSchema,
  companySchema,
  companySchemaEdit,
  recordSchema,
  recordSchemaEdit,
  projectsSchema,
  authSchema,
  jobSchema,
};
