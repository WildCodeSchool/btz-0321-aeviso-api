const express = require("express");
const statuses = require("./dev/statusesExample");

const router = express.Router();

router.get("/", (req, res) => {
  if (statuses.length) res.status(200).json(statuses);
  else res.status(404).json({ message: "Statuses not found" });
});

router.get("/:id", (req, res) => {
  const status = statuses.find((stat) => stat.id === +req.params.id);
  if (status) res.status(200).json(status);
  else res.status(401).json({ message: "Status not found" });
});

router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) res.status(401).json({ message: "Cannot create a status" });
  statuses.push({
    id: statuses.length + 1,
    name,
  });
  res.status(201).json(statuses[statuses.length - 1]);
});

router.put("/:id", (req, res) => {
  const { name } = req.body;
  const index = statuses.findIndex((stat) => stat.id === +req.params.id);
  if (index === -1) res.status(401).json({ message: "statuses invalid" });
  const statusesUpdate = statuses[index];
  statuses[index] = {
    ...statusesUpdate,
    name: name || statusesUpdate.name,
  };
  res.status(201).json({ message: "Status has been updated" });
});

module.exports = router;
