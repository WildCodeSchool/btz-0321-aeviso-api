const express = require("express");

const users = require("./users");
const professions = require("./professions");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/users", users);
router.use("/professions", professions);

module.exports = router;
