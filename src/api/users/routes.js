const express = require("express");

const { user, admin, superadmin } = require("../../utils/roles");
const bodyValidator = require("../../middlewares/bodyValidator");
const verifyCompany = require("../../middlewares/verifyCompany");

const router = express.Router();

const getAll = require("./controllers/getAll");
const getOne = require("./controllers/getOne");
const post = require("./controllers/post");
const put = require("./controllers/put");
const deleteUser = require("./controllers/deleteUser");
const { userSchema } = require("../../schemas");

const getProjects = require("./controllers/getProjects");
const getRecords = require("./controllers/getRecords");

const createUserProject = require("./controllers/createUserProject");
const deleteUserProject = require("./controllers/deleteUserProject");
const verifyUserCompany = require("../../middlewares/verifyUserCompany");
/**
 * A user (with id for output display)
 * @typedef {object} DisplayUser
 * @property {string} id.required - "1"
 * @property {string} firstName - "Jean-Michel"
 * @property {string} lastName - "O'Connor de la Tour"
 * @property {string} email - "jmoconnor@ftm.com"
 * @property {string} role - "USER"
 * @property {string} weeklyBasis - "h35"
 * @property {string} createdAt - ""
 * @property {string} updatedAt - ""
 */

/**
 * A user (for POST req.body)
 * @typedef {object} PostUser
 * @property {string} firstName - "Jean-Michel"
 * @property {string} lastName - "O'Connor de la Tour"
 * @property {string} email - "jmoconnor@ftm.com"
 * @property {string} password - "superpassword"
 * @property {string} role - "USER"
 * @property {string} weeklyBasis - "h35"
 */

router.get("/", superadmin(), getAll);
router.get("/:id", user(), getOne);
router.get("/:id/projects", getProjects);
router.get("/:id/records", getRecords);

router.post("/", admin(), verifyCompany, bodyValidator(userSchema), post);
router.put("/:id", admin(), verifyUserCompany, put);
router.delete("/:id", admin(), verifyUserCompany, deleteUser);
router.post("/:userId/projects/:projectId", admin(), createUserProject);
router.delete("/:userId/projects/:projectId", superadmin(), deleteUserProject);

module.exports = router;
