const express = require("express");
const {
  default: strictTransportSecurity,
} = require("helmet/dist/middlewares/strict-transport-security");
const status = require("./dev/statusExample");

const router = express.Router();

router.get("/", (req, res) => {
  if (status.length) res.status(200).json(status);
  else res.status(404).json({ message: "Status not found" });
});

router.get("/:id", (req, res) => {
  const getIdStatus = status.filter((stat) => stat.id === +req.params.id);
  if (getIdStatus.length) res.status(200).json(getIdStatus);
  else res.status(401).json({ message: "The status is not working" });
});

router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) res.status(401).json({ message: "Cannot create a status" });
  status.push({
    id: status.length + 1,
    name,
  });
  res.status(201).json(status[status.length - 1]);
});

router.put("/:id", (req, res) => {
  const { name } = req.body;
  const index = status.findIndex((stat) => stat.id === +req.params.id);
  if (index === -1) res.status(401).json({ message: "Status invalid" });
  const statusUpdate = status[index];
  status[index] = {
    ...statusUpdate,
    name: name || statusUpdate.name,
  };
  res.status(201).json({ message: "Status has been updated" });
});

module.exports = router;
