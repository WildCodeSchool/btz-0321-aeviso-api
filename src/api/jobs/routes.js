const express = require("express");

const router = express.Router();

const bodyValidator = require("../../middlewares/bodyValidator");
const { jobSchema } = require("../../schemas");

const { admin, user } = require("../../utils/roles");

const getAll = require("./controllers/getAll");
const getOne = require("./controllers/getOne");
const post = require("./controllers/post");
const put = require("./controllers/put");
const deleteJob = require("./controllers/deleteJob");

/**
 * A job (with id for output display)
 * @typedef {object} DisplayJob
 * @property {string} id.required - "1"
 * @property {string} label - "Senior Data Analyst"

 */

/**
 * A job (for POST req.body)
 * @typedef {object} PostUser
 * @property {string} label - "Senior Data Analyst"
 */

router.get("/", admin(), getAll);
router.get("/:id", user(), getOne);
router.post("/", admin(), bodyValidator(jobSchema), post);
router.put("/:id", admin(), bodyValidator(jobSchema), put);
router.delete("/:id", admin(), deleteJob);

module.exports = router;
