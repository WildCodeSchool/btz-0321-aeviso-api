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
const getOneProjectFromCompany = require("./controllers/getOneProjectFromCompany");

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", bodyValidator(companySchema), post);
router.put("/:id", bodyValidator(companySchemaEdit), put);
router.delete("/:id", deleteCompany);

router.get("/:id/projects", getProjectsFromCompany);
router.get("/:id/projects/:projectId", getOneProjectFromCompany);

module.exports = router;
