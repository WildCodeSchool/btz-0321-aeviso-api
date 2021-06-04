const express = require("express");
const professionsExample = require("./dev/professionsExample");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(professionsExample);
});

router.get("/:id", (req, res) => {
  const id = +req.params.id;
  const result = professionsExample.find((profession) => profession.id === id);
  if (result) res.status(200).json(result);
  else
    res.status(404).json({
      message: "No profession found",
    });
});

router.post("/", (req, res) => {
  const initial = professionsExample;
  const newProfession = {
    id: [...initial].pop().id + 1,
    ...req.body,
  };
  initial.push(newProfession);
  res.status(201).json(initial[initial.length - 1]);
});

router.put("/:id", (req, res) => {
  const id = +req.params.id;
  const index = professionsExample.findIndex(
    (profession) => profession.id === id
  );
  if (index >= 0) {
    let elementToUpdate = professionsExample[index];
    elementToUpdate = {
      id,
      ...req.body,
    };
    professionsExample.splice(index, 1, elementToUpdate);
    res.status(200).json(elementToUpdate);
  } else
    res.status(404).json({
      message: "No profession found",
    });
});

router.delete("/:id", (req, res) => {
  const id = +req.params.id;
  const index = professionsExample.indexOf(
    professionsExample.find((profession) => profession.id === id)
  );

  if (index >= 0) {
    professionsExample.splice(index, 1);
    res.status(204).json({
      message: "profession deleted",
    });
  } else
    res.status(404).json({
      message: "No profession found",
    });
});

module.exports = router;
