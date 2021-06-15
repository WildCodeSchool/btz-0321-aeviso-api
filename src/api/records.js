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
  const { date, timeslot, comment, userId, projectId } = req.body;
  try {
    const record = await prisma.record.create({
      data: {
        date,
        timeslot,
        comment,
        user: { connect: { id: userId } },
        project: { connect: { id: projectId } },
      },
    });

    return res.status(201).json(record);
  } catch (error) {
    return res.status(404).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { timeslot, comment } = req.body;
  try {
    const record = await prisma.record.update({
      where: { id },
      data: {
        timeslot,
        comment,
      },
    });
    res.status(200).json(record);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.record.delete({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ message: "Record is not deleted yet" });
  }
});

module.exports = router;
