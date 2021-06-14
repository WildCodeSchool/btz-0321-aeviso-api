const express = require("express");
const getAll = require("./controllers/getAll");
const getOne = require("./controllers/getOne");
const deleteProject = require("./controllers/deleteproject");
const post = require("./controllers/post");
const put = require("./controllers/put");

const router = express.Router();

router.get("/", getAll);

router.get("/:id", getOne);

router.post("/", post);

router.put("/:id", put);

router.delete("/:id", deleteProject);

module.exports = router;
