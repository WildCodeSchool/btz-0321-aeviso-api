const express = require("express");
const bodyValidator = require("../../middlewares/bodyValidator");
const { authSchema } = require("../../schemas");

const router = express.Router();

const login = require("./controllers/login");
const logout = require("./controllers/logout");
const me = require("./controllers/me");
const verifyToken = require("../../middlewares/verifyToken");

router.post("/login", bodyValidator(authSchema), login);
router.get("/logout", logout);
router.get("/me", verifyToken, me);

module.exports = router;
