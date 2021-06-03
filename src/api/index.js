const express = require("express");

const users = require("./users");
const professions = require("./professions");
const projets = require("./projects")

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/users", users);
router.use("/professions", professions);
router.use("/projets", projets)

module.exports = router;
