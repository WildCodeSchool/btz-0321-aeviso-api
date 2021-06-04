const express = require("express");

const users = require("./users");
const professions = require("./professions");
const projects = require("./projects")

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/users", users);
router.use("/professions", professions);
router.use("/projects", projects)

module.exports = router;
