const express = require("express");
const companies = require("./dev/companiesExample");

const router = express.Router();

router.get("/", (req, res) => {
  const org = companies;
  if (org.length) res.status(200).json(org);
  else res.status(404).json({ message: "companies not found" });
});

router.get("/:id", (req, res) => {
  const org = companies.filter((cie) => cie.id === +req.params.id);
  if (org.length) res.status(200).json(org);
  else res.status(404).json({ message: "The company have not been found" });
});

module.exports = router;
