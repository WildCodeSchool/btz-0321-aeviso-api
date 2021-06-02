const express = require("express");
const professionsExample = require("./dev/professionsExample");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json(professionsExample);




});


module.exports = router;
