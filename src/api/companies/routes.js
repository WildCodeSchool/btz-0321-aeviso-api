const express = require("express");
const bodyValidator = require("../../middlewares/bodyValidator");

const router = express.Router();

const getAll = require("./controllers/getAll");
const getOne = require("./controllers/getOne");
const post = require("./controllers/post");
const put = require("./controllers/put");
const deleteCompany = require("./controllers/deleteCompany");
const { companySchema, companySchemaEdit } = require("../../schemas");

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", bodyValidator(companySchema), post);
router.put("/:id", bodyValidator(companySchemaEdit), put);
router.delete("/:id", deleteCompany);

module.exports = router;
