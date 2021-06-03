const express = require("express");
const records = require("./dev/records");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(records || []);
});

router.get("/:id", (req, res) => {
  const record = records.find((rec) => rec.id === +req.params.id);
  if (record) res.status(200).json(record);
  else res.status(400).json({ message: "Record not found" });
});

router.post("/", (req, res) => {
  const { user_id, project_id, step_id, time_slot } = req.body;
  if (!time_slot) {
    return res.status(401).json({ message: "Missing fields" });
  }
  records.push({
    id: records.length + 1,
    user_id: user_id || null,
    project_id: project_id || null,
    step_id: step_id || null,
    time_slot,
  });
  res.status(201).json(records[records.length - 1]);
});

router.put("/:id", (req, res) => {
  const { user_id, project_id, step_id, time_slot } = req.body;
  const index = records.findIndex((rec) => rec.id === +req.params.id);
  if (index === -1) return res.status(400).json({ message: "Invalid Record" });

  const record = records[index];
  records[index] = {
    ...record,
    user_id: user_id || null,
    project_id: project_id || null,
    step_id: step_id || null,
    time_slot,
  };
  res.status(200).json(records[index]);
});

router.delete("/:id", (req, res) => {
  const index = records.findIndex((rec) => rec.id === +req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Record not found" });
  records.splice(index, 1);
  res.status(200).json({ message: "Records is deleted" });
});

module.exports = router;
