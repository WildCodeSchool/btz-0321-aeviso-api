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
  const { name, description, code, companieId } = req.body;

  prisma.project
    .create({
      data: {
        name,
        description,
        code,
        company: {
          connect: {
            id: companieId,
          },
        },
      },
    })
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  const id = +req.params.id;
  const index = projetsExample.indexOf(projetsExample.find((projet) => projet.id === id));

  if (index >= 0) {
    let newProject = projetsExample.find((project) => project.id === id);
    newProject = {
      id,
      ...req.body,
    };
    projetsExample.splice(index, 1, newProject);
    res.status(200).json(newProject);
  } else {
    res.status(404).json({ message: 'not found' });
  }
});

router.delete('/:id', (req, res) => {
  const id = +req.params.id;
  const index = projetsExample.indexOf(projetsExample.find((projet) => projet.id === id));

  if (res) {
    projetsExample.splice(index, 1);
    res.status(204).json({ message: 'Projets deleted' });
  } else {
    res.status(404).json({ message: 'not found' });
  }
});

module.exports = router;
