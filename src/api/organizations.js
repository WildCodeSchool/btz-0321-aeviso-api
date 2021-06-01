const express = require("express");
const organizations = require("./dev/organizationsExample");

const router = express.Router();

router.get("/", (req, res) => {
  const org = organizations;
  if (org.length) res.status(200).json(org);
  else res.status(404).json({ message: "Organizations not found" });
});

router.get("/:id", (req, res) => {
  const org = organizations.filter((cie) => cie.id === +req.params.id);
  if (org.length) res.status(200).json(org);
  else
    res.status(404).json({ message: "The organization have not been found" });
});

router.get("/:name", (req, res) => {
  const org = organizations.filter((cie) => cie.id === +req.params.name);
  if (org.length) res.status(200).json(org);
  else
    res.status(404).json({ message: "The organization have not been found" });
});

module.exports = router;
