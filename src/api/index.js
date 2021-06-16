const express = require("express");

const companies = require("./companies");
const users = require("./users/routes");
const records = require("./records");
const jobs = require("./jobs/routes");
const projects = require("./projects/routes");


const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/companies", companies);
router.use("/users", users);
router.use("/records", records);
router.use("/jobs", jobs);
router.use("/projects", projects);

module.exports = router;
