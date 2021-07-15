const express = require("express");

const { user, admin, superadmin } = require("../../utils/roles");
const verifyProject = require("../../middlewares/verifyProject");
const bodyValidator = require("../../middlewares/bodyValidator");

const router = express.Router();

const getAll = require("./controllers/getAll");
const getOne = require("./controllers/getOne");
const deleteProject = require("./controllers/deleteproject");
const post = require("./controllers/post");
const put = require("./controllers/put");
const { projectsSchema } = require("../../schemas");
const getRecordsFromUserFromProject = require("./controllers/getRecordsFromUserFromProject");
const createProjectUser = require("./controllers/createProjectUser");
const deleteProjectUser = require("./controllers/deleteProjectUser");
const getRecordsFromOneProject = require("./controllers/getRecordsFromOneProject");
const getUsers = require("./controllers/getUsers");

/**
 * A project (with id for output display)
 * @typedef {object} DisplayProject
 * @property {string} id.required - "1"
 * @property {string} name - "La vie en rouge et noir"
 * @property {string} description - "Superbe projet sur les fêtes de Saint Jean de Luz"
 * @property {string} company - "Mairie de Saint Jean de Luz"
 * @property {string} code - "CII"
 * @property {string} createdAt - ""
 * @property {string} updatedAt - ""
 */

/**
 * A user (for POST req.body)
 * @typedef {object} PostProject
 * @property {string} id.required - "1"
 * @property {string} name - "La vie en rouge et noir"
 * @property {string} description - "Superbe projet sur les fêtes de Saint Jean de Luz"
 * @property {string} company - "Mairie de Saint Jean de Luz"
 * @property {string} code - "CII"
 * @property {string} taxation - ""
 * @property {string} createdAt - ""
 * @property {string} updatedAt - ""
 */

router.get("/", superadmin(), getAll);
router.get("/:id", user(), getOne);
router.post("/", admin(), bodyValidator(projectsSchema), post);
router.put("/:id", admin(), put);
router.delete("/:id", superadmin(), deleteProject);
router.get(
  "/:projectId/records",
  user(),
  verifyProject,
  getRecordsFromOneProject
);
router.get("/:id/users", user(), getUsers);
router.get(
  "/:projectId/users/:userId/records",
  user(),
  getRecordsFromUserFromProject
);
router.post("/:projectId/users/:userId", admin(), createProjectUser);
router.delete("/:projectId/users/:userId", admin(), deleteProjectUser);

module.exports = router;
