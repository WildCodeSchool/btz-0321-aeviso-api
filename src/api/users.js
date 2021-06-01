const express = require("express");
const usersExemple = require("./dev/usersExemple");

const router = express.Router();

router.get("/", (req, res) => {
  const result = usersExemple;
  if (result.length) res.status(200).json(result);
  else
    res.status(404).json({
      message: "No user found",
    });
});

router.get("/:id", (req, res) => {
  const result = usersExemple.filter((user) => user.id === +req.params.id);
  if (result.length) res.status(200).json(result);
  else
    res.status(404).json({
      message: "No user found",
    });
});

module.exports = router;
