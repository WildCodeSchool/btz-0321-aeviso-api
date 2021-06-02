const express = require("express");
const professionsExample = require("./dev/professionsExample");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json(professionsExample);
});


router.get("/:id",(req, res) => {
    const id = +req.params.id;
    const result = professionsExample.find((profession) => profession.id === id);
    if (result) res.status(200).json(result);
    else
    res.status(404).json({
        message: "No user found",
    });
   
});

router.post("/", (req, res) => {
    const initial= professionsExample; 
    const newProfession = {
        id: [...initial].pop().id + 1,
        ...req.body,
    };
    initial.push(newProfession);
    res.status(201).json(initial[initial.length -1]);

});

module.exports = router;
