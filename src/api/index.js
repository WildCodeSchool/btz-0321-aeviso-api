const express = require("express");

const companies = require("./companies");
const users = require("./users");
const statuses = require("./statuses");
const records = require("./records");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/companies", companies);
router.use("/users", users);
router.use("/statuses", statuses);
router.use("/records", records);
module.exports = router;
