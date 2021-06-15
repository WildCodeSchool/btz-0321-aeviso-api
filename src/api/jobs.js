const express = require('express');
const prisma = require('../../prismaClient');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await prisma.jobs.findMany();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({message: 'Bad Request' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const jobs = await prisma.jobs.findUnique({
      where: {
        id,
      },
    });
    if (jobs) {
      return res.status(200).json(jobs);
    }
    return res.status(404).js ({ message: 'No job foundon' });
  } catch (err) {
    res.status(404).json(err);

    }
});

router.post('/', async (req, res) => {
  const { label, } = req.body;
  try {
    if (labelId) {
      label = {
        connect: {
          id: labelId,
        },
      };
      if (labelId === null) {
        job: {
          disconnect: true;
        }
      }

      const jobs = await prisma.jobs.create({
        data: {
          label,
          connect: {
              id: labelId,
            },
          },
        });

      res.status(201).json(label);
    }
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});


router.put('/:id', async (req, res) => {
  let jobs;
  const { id } = req.params;
  const { jobs, } = req.body;
  if (!jobId) {
    res.status(400).json({ message: 'No job found' });
  } else {
    try {
      if (jobId) {
        jobs = {
          connect: {
            id: jobsId,
          },
        };
        if (jobsId === null) {
          job: {
            disconnect: true;
          }
        }
      }

      const jobs = await prisma.jobs.update({
        data: {
          jobs: {
            connect: {
              id: jobsId,
            },
          },
        },
        where: {
          id,
        },
      });
      res.status(200).json(jobs);
    } catch (err) {
      res.status(404).json(err);
    }
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.jobs.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(404).json({ message: 'job deleted' });
  }
});


module.exports = router;
