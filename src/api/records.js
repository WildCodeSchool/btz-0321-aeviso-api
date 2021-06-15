const express = require("express");
const prisma = require("../../prismaClient");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const record = await prisma.record.findMany();
    res.status(200).json(record);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const record = await prisma.record.findUnique({ where: { id } });
    res.status(200).json(record);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post("/", async (req, res) => {
  const { userId, date, timeslot, comment } = req.body;
  try {
    const record = await prisma.record.create({
      data: { userId, date, timeslot, comment },
    });
    res.status(201).json(record);
  } catch (error) {
    res.status(404).json(error);
  }
});

// router.post("/", (req, res) => {
//   const { user_id, project_id, step_id, time_slot } = req.body;
//   if (!time_slot) {
//     return res.status(401).json({ message: "Missing fields" });
//   }
//   records.push({
//     id: records.length + 1,
//     user_id: user_id || null,
//     project_id: project_id || null,
//     step_id: step_id || null,
//     time_slot,
//   });
//   res.status(201).json(records[records.length - 1]);
// });

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
  res.sendStatus(204);
});

module.exports = router;
