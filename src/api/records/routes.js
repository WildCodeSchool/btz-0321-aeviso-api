const express = require("express");

const { superadmin, user } = require("../../utils/roles");
const bodyValidator = require("../../middlewares/bodyValidator");

const router = express.Router();

const getAll = require("./controllers/getAll");
const getOne = require("./controllers/getOne");
const post = require("./controllers/post");
const put = require("./controllers/put");
const deleteRecord = require("./controllers/deleteRecord");
const { recordSchema, recordSchemaEdit } = require("../../schemas");

/**
 * A user (with id for output display)
 * @typedef {object} DisplayRecord
 * @property {string} id.required - "1"
 * @property {string} timeslot - "AFTERNOON"
 * @property {string} comment - "Toute l'après midi sur ce projet"
 * @property {string} date - ""
 * @property {string} user - "Philipe de Mont Mirail"
 * @property {string} project - "Projet 12 sur Btz"
 * @property {string} createdAt - ""
 * @property {string} updatedAt - ""
 */

/**
 * A user (for POST req.body)
 * @typedef {object} PostRecord
 * @property {string} timeslot - "AFTERNOON"
 * @property {string} comment - "Toute l'après midi sur ce projet"
 * @property {string} date - ""
 * @property {string} user - "Philipe de Mont Mirail"
 * @property {string} project - "Projet 12 sur Btz"
 * @property {string} createdAt - ""
 * @property {string} updatedAt - ""
 */

router.get("/", superadmin(), getAll);
router.get("/:id", user(), getOne);
router.post("/", user(), bodyValidator(recordSchema), post);
router.put("/:id", user(), bodyValidator(recordSchemaEdit), put);
router.delete("/:id", user(), deleteRecord);

module.exports = router;
