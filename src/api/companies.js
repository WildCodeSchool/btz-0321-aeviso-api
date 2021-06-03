const express = require("express");
const companies = require("./dev/companiesExample");

const router = express.Router();

router.get("/", (req, res) => {
  if (companies.length) res.status(200).json(companies);
  else res.status(404).json({ message: "companies not found" });
});

router.get("/:id", (req, res) => {
  const company = companies.find((co) => co.id === +req.params.id);
  if (company) res.status(200).json(company);
  else res.status(404).json({ message: "The company have not been found" });
});

router.post("/", (req, res) => {
  const { name, zip_code, city, status_id } = req.body;
  if (!name || !zip_code || !city) {
    return res.status(400).json({ message: "Please enter the right datas!" });
  }

  companies.push({
    id: companies.length + 1,
    name,
    zip_code,
    city,
    status_id: status_id || null,
    created_at: '01-01-2000',
    updated_at: '02-02-2000',
  });



  res.status(201).json(companies[companies.length - 1]);
});

router.put("/:id", (req, res) => {
  const { name, zip_code, city } = req.body;
  const index = companies.findIndex((company) => company.id === +req.params.id);

  if (index === -1) {
    return res.status(400).json({ message: "Invalid company." });
  }
  const company = companies[index];
  companies[index] = {
    ...company,
    name: name || company.name,
    zip_code: zip_code || company.zip_code,
    city: city || company.city,
  };

  res.status(200).json(companies[index]);
});

router.delete("/:id", (req, res) => {
  const index = companies.findIndex((company) => company.id === +req.params.id);

  if (index === -1) {
    return res.status(400).json({ message: "Company not found" });
  }

  companies.splice(index, 1);
  res.sendStatus(204);
});

module.exports = router;
