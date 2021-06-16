const express = require("express");

const companies = require("./companies/routes");
const users = require("./users/routes");
const records = require("./records/routes");
const professions = require("./professions");
const projects = require("./projects");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/companies", companies);
router.use("/users", users);
router.use("/records", records);
router.use("/professions", professions);
router.use("/projects", projects);

module.exports = router;
