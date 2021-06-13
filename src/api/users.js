const express = require("express");
const { PrismaClient } = require("@prisma/client");
const usersExample = require("./dev/usersExample");

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  return res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
  const result = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (result) res.status(200).json(result);
  else
    res.status(404).json({
      message: "No user found",
    });
});

router.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    weeklyBasis,
    companyId,
    jobId,
  } = req.body;
  if (!firstName || !lastName || !email || !jobId) {
    res.status(400).json({ message: "Missing required field" });
  } else {
    try {
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password,
          role,
          weeklyBasis,
          company: {
            connect: {
              id: companyId,
            },
          },
          job: {
            connect: {
              id: jobId,
            },
          },
        },
      });
      res.status(201).json(user);
    } catch {
      res.status(400).json({ message: "Bad request" });
    }
  }
});

router.put("/:id", (req, res) => {
  const id = +req.params.id;
  const index = usersExample.indexOf(
    usersExample.find((user) => user.id === id)
  );
  if (index >= 0) {
    let elementToUpdate = usersExample.find((user) => user.id === id);
    elementToUpdate = {
      id,
      ...req.body,
    };
    usersExample.splice(index, 1, elementToUpdate);
    res.status(200).json(elementToUpdate);
  } else
    res.status(404).json({
      message: "No user found",
    });
});

router.delete("/:id", (req, res) => {
  const id = +req.params.id;
  const index = usersExample.indexOf(
    usersExample.find((user) => user.id === id)
  );
  if (index >= 0) {
    usersExample.splice(index, 1);
    res.status(204).json({
      message: "User deleted",
    });
  } else
    res.status(404).json({
      message: "No user found",
    });
});

module.exports = router;
