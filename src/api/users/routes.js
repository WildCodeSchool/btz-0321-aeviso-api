const express = require("express");
const bodyValidator = require("../../middlewares/bodyValidator");

const router = express.Router();

const getAll = require("./controllers/getAll");
const getOne = require("./controllers/getOne");
const post = require("./controllers/post");
const put = require("./controllers/put");
const deleteUser = require("./controllers/deleteUser");
const { userSchema } = require("../../schemas");

const createUserProject = require("./controllers/createUserProject");
const deleteUserProject = require("./controllers/deleteUserProject");
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

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", bodyValidator(userSchema), post);
router.put("/:id", put);
router.delete("/:id", deleteUser);

router.post("/:userId/projects/:projectId", createUserProject);
router.delete("/:userId/projects/:projectId", deleteUserProject);

module.exports = router;
