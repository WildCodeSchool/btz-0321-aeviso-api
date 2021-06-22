const express = require("express");
const bodyValidator = require("../../middlewares/bodyValidator");

const router = express.Router();

const getAll = require("./controllers/getAll");
const getOne = require("./controllers/getOne");
const post = require("./controllers/post");
const put = require("./controllers/put");
const deleteCompany = require("./controllers/deleteCompany");
const { companySchema, companySchemaEdit } = require("../../schemas");
const getProjectsFromCompany = require("./controllers/getProjectsFromCompany");

/**
 * A company (with id for output display)
 * @typedef {object} DisplayCompany
 * @property {string} id.required - "1"
 * @property {string} name - "Fnac Saint Jean de Luz"
 * @property {string} logoUrl - "http://logo.fr/ref"
 * @property {string} createdAt - ""
 * @property {string} updatedAt - ""
 */

/**
 * A company (for POST req.body)
 * @typedef {object} PostCompany
 * @property {string} name - "Fnac Saint Jean de Luz"
 * @property {string} logoUrl - "http://logo.fr/ref"

 */

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", bodyValidator(companySchema), post);
router.put("/:id", bodyValidator(companySchemaEdit), put);
router.delete("/:id", deleteCompany);

router.get("/:id/projects", getProjectsFromCompany);

module.exports = router;
