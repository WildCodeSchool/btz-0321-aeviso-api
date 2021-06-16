const express = require("express");
const bodyValidator = require("../../middlewares/bodyValidator");
const { authSchema } = require("../../schemas");

const router = express.Router();

const login = require("./controllers/login");
const logout = require("./controllers/logout");

router.post("/login", bodyValidator(authSchema), login);
router.post("/logout", logout);

module.exports = router;
