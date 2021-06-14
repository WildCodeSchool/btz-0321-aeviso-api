const express = require('express');
const prisma = require('../../prismaClient');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const project = await prisma.project.findMany();
    res.status(200).json(project);
  } catch (e) {
    res.status(404).json(e);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'no Project found' });
    }
  } catch (err) {
    res.status(404).json(err);
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
      res.status(404).json(err);
    });
});

router.put('/:id', async (req, res) => {
  let company;
  const { id } = req.params;
  const { name, description, code, companyId, taxation } = req.body;
  if (!name || !description || !code || !companyId) {
    res.status(400).json({ message: 'bad resquest' });
  } else {
    try {
      if (companyId) {
        company = {
          connect: {
            id: companyId,
          },
        };
        if (companyId === null) {
          company: {
            disconnect: true;
          }
        }
      }
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
      res.status(404).json(err);
    }
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
    res.status(404).json({ message: 'Project is not delete' });
  }
});

module.exports = router;
