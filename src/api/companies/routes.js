const express = require("express");
const bodyValidator = require("../../middlewares/bodyValidator");
const { user, admin, superadmin } = require("../../utils/roles");
const verifyCompany = require("../../middlewares/verifyCompany");

const router = express.Router();

const getAll = require("./controllers/getAll");
const getOne = require("./controllers/getOne");
const post = require("./controllers/post");
const put = require("./controllers/put");
const deleteCompany = require("./controllers/deleteCompany");
const { companySchema, companySchemaEdit } = require("../../schemas");
const getProjectsFromCompany = require("./controllers/getProjectsFromCompany");
const getUsers = require("./controllers/users");

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

router.get("/", superadmin(), verifyCompany, getAll);
router.post("/", superadmin(), bodyValidator(companySchema), post);

router.use(verifyCompany);

router.get("/:id", user(), getOne);
router.put(
  "/:id",
  admin(),
  verifyCompany,
  bodyValidator(companySchemaEdit),
  put
);
router.delete("/:id", admin(), deleteCompany);
router.get("/:id/projects", user(), getProjectsFromCompany);
router.get("/:id/users", user(), getUsers);

module.exports = router;
