const express = require("express");

const router = express.Router();

const login = require("./controllers/login");
const logout = require("./controllers/logout");

router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
