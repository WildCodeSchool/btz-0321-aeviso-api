const express = require("express");
const { PrismaClient } = require("@prisma/client");
const errors = require("./errors");

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
  else res.status(404).json(errors[400]);
});

router.post("/", async (req, res) => {
  let company;
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
      if (companyId) {
        company = {
          connect: {
            id: companyId,
          },
        };
      }
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password,
          role,
          weeklyBasis,
          company,
          job: {
            connect: {
              id: jobId,
            },
          },
        },
      });
      res.status(201).json(user);
    } catch (e) {
      res.status(400).json(errors[e.code]);
    }
  }
});

router.put("/:id", async (req, res) => {
  let company;
  const { id } = req.params;
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

  try {
    if (companyId) {
      company = {
        connect: {
          id: companyId,
        },
      };
    }
    if (companyId === null) {
      company = {
        disconnect: true,
      };
    }
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        email,
        password,
        role,
        weeklyBasis,
        company,
        job: {
          connect: {
            id: jobId,
          },
        },
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(404).json(errors[e.code]);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    res.status(204).json(errors.users[204]);
  } catch (e) {
    res.status(404).json(errors.users[e.code]);
  }
});

module.exports = router;
