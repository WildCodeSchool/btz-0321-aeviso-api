const express = require("express");
const bodyValidator = require("../../middlewares/bodyValidator");

const router = express.Router();

const getAll = require("./controllers/getAll");
const getOne = require("./controllers/getOne");
const post = require("./controllers/post");
const put = require("./controllers/put");
const deleteRecord = require("./controllers/deleteRecord");
const { recordSchema, recordSchemaEdit } = require("../../schemas");

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", bodyValidator(recordSchema), post);
router.put("/:id", bodyValidator(recordSchemaEdit), put);
router.delete("/:id", deleteRecord);

module.exports = router;
