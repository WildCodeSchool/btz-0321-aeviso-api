const express = require("express");
const prisma = require("../../prismaClient");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const job = await prisma.job.findMany();
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const job = await prisma.job.findUnique({
      where: {
        id,
      },
    });
    if (job) res.status(200).json(job);
    else res.status(404).json({ message: "No job found" });
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/", async (req, res) => {
  const { label } = req.body;
  try {
    const job = await prisma.job.create({
      data: {
        label,
      },
    });
    res.status(201).json(job);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { label } = req.body;
  if (!label) {
    res.status(400).json({ message: "No job found" });
  } else {
    try {
      const job = await prisma.job.update({
        data: {
          label,
        },
        where: {
          id,
        },
      });
      res.status(200).json(job);
    } catch (err) {
      res.status(404).json(err);
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.job.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(404).json({ message: "job deleted" });
  }
});

module.exports = router;
