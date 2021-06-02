const express = require("express");

const companies = require("./companies");
const users = require("./users");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/companies", companies);
router.use("/users", users);

module.exports = router;
