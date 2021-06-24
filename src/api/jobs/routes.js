const express = require("express");

const router = express.Router();

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

router.get("/", getAll);

router.get("/:id", getOne);

router.post("/", post);

router.put("/:id", put);

router.delete("/:id", deleteJob);

module.exports = router;
