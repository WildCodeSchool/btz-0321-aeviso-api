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
  const result = usersExemple.find((user) => user.id === +req.params.id);
  if (result) res.status(200).json(result);
  else
    res.status(404).json({
      message: "No user found",
    });
});

router.post("/", (req, res) => {
  const initial = usersExemple;
  const newUser = {
    id: [...initial].pop().id + 1,
    ...req.body,
  };
  initial.push(newUser);
  res.status(201).json(initial[initial.length - 1]);
});

router.put("/:id", (req, res) => {
  const id = +req.params.id;
  const index = usersExemple.indexOf(
    usersExemple.find((user) => user.id === id)
  );
  if (index >= 0) {
    let elementToUpdate = usersExemple.find((user) => user.id === id);
    elementToUpdate = {
      id,
      ...req.body,
    };
    usersExemple.splice(index, 1, elementToUpdate);
    res.status(200).json({
      message: "User updated",
    });
  } else
    res.status(404).json({
      message: "No user found",
    });
});

router.delete("/:id", (req, res) => {
  const id = +req.params.id;
  const index = usersExemple.indexOf(
    usersExemple.find((user) => user.id === id)
  );
  if (index >= 0) {
    usersExemple.splice(index, 1);
    res.status(200).json({
      message: "User deleted",
    });
  } else
    res.status(404).json({
      message: "No user found",
    });
});

module.exports = router;
