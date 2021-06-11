const express = require('express');
const projetsExample = require('./dev/projectsExamples.json');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.get('/', (req, res) => {
  prisma.project
    .findMany()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  const { name, description, code, companyId, taxation } = req.body;
  console.log(name, description, code, companyId);
  prisma.project
    .create({
      data: {
        name,
        description,
        code,
        taxation,
        company: {
          connect: {
            id: companyId,
          },
        },
      },
    })
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, code, companyId, taxation } = req.body;

  try {
    const project = await prisma.project.update({
      data: {
        name,
        description,
        code,
        taxation,
        company: {
          connect: {
            id: companyId,
          },
        },
      },
      where: {
        id,
      },
    });
    res.status(200).json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
