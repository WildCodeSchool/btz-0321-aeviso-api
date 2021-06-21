const express = require("express");
const getAll = require("./controllers/getAll");
const getOne = require("./controllers/getOne");
const deleteProject = require("./controllers/deleteproject");
const post = require("./controllers/post");
const put = require("./controllers/put");
const bodyValidator = require("../../middlewares/bodyValidator");
const { projectsSchema } = require("../../schemas");
const getRecordsFromUserFromProject = require("./controllers/getRecordsFromUserFromProject");
const createProjectUser = require("./controllers/createProjectUser");
const deleteProjectUser = require("./controllers/deleteProjectUser");
const getRecordsFromOneProject = require("./controllers/getRecordsFromOneProject");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", bodyValidator(projectsSchema), post);
router.put("/:id", put);
router.delete("/:id", deleteProject);

router.get("/:projectId/records", getRecordsFromOneProject);
router.get("/:projectId/users/:userId/records", getRecordsFromUserFromProject);
router.post("/:projectId/users/:userId", createProjectUser);
router.delete("/:projectId/users/:userId", deleteProjectUser);

module.exports = router;
