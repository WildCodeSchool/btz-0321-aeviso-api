const express = require("express");
const bodyValidator = require("../../middlewares/bodyValidator");
const { authSchema } = require("../../schemas");

const router = express.Router();

const login = require("./controllers/login");

router.post("/login", bodyValidator(authSchema), login);

module.exports = router;
