const express = require("express");

const organizations = require("./organizations");
const users = require("./users");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/organizations", organizations);
router.use("/users", users);

module.exports = router;
