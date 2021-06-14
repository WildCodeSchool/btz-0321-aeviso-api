const express = require("express");

const router = express.Router();

const getAll = require("./controllers/getAll");
const getOne = require("./controllers/getOne");
const post = require("./controllers/post");
const put = require("./controllers/put");
const deleteUser = require("./controllers/deleteUser");

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", post);
router.put("/:id", put);
router.delete("/:id", deleteUser);

module.exports = router;
