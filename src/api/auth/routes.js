const express = require("express");
const bodyValidator = require("../../middlewares/bodyValidator");
const { authSchema } = require("../../schemas");

const router = express.Router();

const login = require("./controllers/login");
const me = require("./controllers/me");

router.post("/login", bodyValidator(authSchema), login);
router.get("/me", me);

module.exports = router;
