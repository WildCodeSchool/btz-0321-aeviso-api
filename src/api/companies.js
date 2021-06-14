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
  try {
    const company = await prisma.company.update({
      where: { id },
      data: {
        name,
        logoUrl,
      },
    });
    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json({ message: "Please modify your field" });
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

// router.put("/:id", (req, res) => {
//   const { name, zip_code, city } = req.body;
//   const index = companies.findIndex((company) => company.id === +req.params.id);
//   const errorMessage = { message: "Company not found." };

//   if (index === -1) {
//     return res.status(404).json(errorMessage);
//   }

//   const company = companies[index];

//   companies[index] = {
//     ...company,
//     name: name || company.name,
//     zip_code: zip_code || company.zip_code,
//     city: city || company.city,
//   };

//   res.status(200).json(company);
// });

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
