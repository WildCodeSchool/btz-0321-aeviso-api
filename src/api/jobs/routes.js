const express = require("express");
const getAll = require("./controllers/getAll");
const getOne = require("./controllers/getOne");
const post = require("./controllers/post");
const put = require("./controllers/put");
const deleteJob = require("./controllers/deleteJob");

const router = express.Router();

router.get("/", getAll);

router.get("/:id", getOne);

router.post("/", post);

router.put("/:id", put);

router.delete("/:id", deleteJob);

module.exports = router;
