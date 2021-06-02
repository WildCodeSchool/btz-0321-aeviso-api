const express = require("express");
const companies = require("./dev/companiesExample");

const router = express.Router();

router.get("/", (req, res) => {
  if (companies.length) res.status(200).json(companies);
  else res.status(404).json({ message: "companies not found" });
});

router.get("/:id", (req, res) => {
  companies.filter((cie) => cie.id === +req.params.id);
  if (companies.length) res.status(200).json(companies);
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
  });
  res.status(201).json(companies[companies.length - 1]);
});

module.exports = router;
