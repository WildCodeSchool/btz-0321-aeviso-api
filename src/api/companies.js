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
  const { id, name, logoUrl, createdAt, updatedAt } = req.body;
  const company = await prisma.company.create({
    data: {
      id,
      name,
      logoUrl,
      createdAt,
      updatedAt,
    },
  });

  // const company = companies.find((co) => co.id === +req.params.id);
  const errorMessage = {
    message: "Company not found.",
  };

  return res.status(company ? 200 : 404).json(company || errorMessage);
});

router.post("/", (req, res) => {
  const { name, zip_code, city } = req.body;
  const errorMessage = { message: "Missing fields." };

  if (!name || !zip_code || !city) {
    return res.status(400).json(errorMessage);
  }

  companies.push({
    id: companies.length + 1,
    name,
    zip_code,
    city,
    created_at: "01-01-2000",
    updated_at: "02-02-2000",
  });

  res.status(201).json(companies[companies.length - 1]);
});

router.put("/:id", (req, res) => {
  const { name, zip_code, city } = req.body;
  const index = companies.findIndex((company) => company.id === +req.params.id);
  const errorMessage = { message: "Company not found." };

  if (index === -1) {
    return res.status(404).json(errorMessage);
  }

  const company = companies[index];

  companies[index] = {
    ...company,
    name: name || company.name,
    zip_code: zip_code || company.zip_code,
    city: city || company.city,
  };

  res.status(200).json(company);
});

router.delete("/:id", (req, res) => {
  const index = companies.findIndex((company) => company.id === +req.params.id);
  const errorMessage = { message: "Company not found." };

  if (index === -1) {
    return res.status(404).json(errorMessage);
  }

  companies.splice(index, 1);

  res.sendStatus(204);
});

module.exports = router;
