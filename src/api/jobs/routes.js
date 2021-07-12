const express = require("express");

const { user, admin } = require("../../utils/roles");

const router = express.Router();

const getAll = require("./controllers/getAll");
const getOne = require("./controllers/getOne");
const post = require("./controllers/post");
const put = require("./controllers/put");
const deleteJob = require("./controllers/deleteJob");
const verifyRole = require("../../middlewares/verifyRole");

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
router.post("/", admin(), post);
router.put("/:id", admin(), put);
router.delete("/:id", admin(), deleteJob);

module.exports = router;
