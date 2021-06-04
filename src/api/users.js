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

router.post("/", (req, res) => {
  const initial = usersExemple;
  const newUser = {
    id: [ ...initial ].pop().id + 1,
    ...req.body,
  };
  initial.push(newUser);
  res.status(200).json(initial[initial.length - 1]);
});

module.exports = router;
