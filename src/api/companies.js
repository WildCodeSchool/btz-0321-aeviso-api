const express = require("express");
const prisma = require("../../prismaClient");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const company = await prisma.company.findMany();
    res.status(200).json(company);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const company = await prisma.company.findUnique({
      where: {
        id,
      },
    });
    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json({ message: "No Company found" });
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/", async (req, res) => {
  const { name, logoUrl } = req.body;
  try {
    const company = await prisma.company.create({
      data: {
        name,
        logoUrl,
      },
    });
    res.status(201).json(company);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, logoUrl } = req.body;
  if (!name || !logoUrl) {
    return res.status(422).json({ message: "bad request" });
  }
  try {
    const company = await prisma.company.update({
      where: { id },
      data: {
        name,
        logoUrl,
      },
    });
    res.status(200).json(company);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.company.delete({
      where: { id },
    });
    res.status(204);
  } catch (err) {
    res.status(404).json({ message: "Company is not deleted yet" });
  }
});

module.exports = router;
