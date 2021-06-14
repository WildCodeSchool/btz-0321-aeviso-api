const express = require("express");
const prisma = require("../../../prismaClient");
const getAll = require("./controllers/getAll");
const deleteProject = require("./controllers/deleteproject");

const router = express.Router();

router.get("/", getAll);

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });
    if (project) {
      return res.status(200).json(project);
    }
    return res.status(404).json({ message: "no Project found" });
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/", async (req, res) => {
  const { name, description, code, companyId, taxation } = req.body;
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
      const project = await prisma.project.create({
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
      });
      res.status(201).json(project);
    }
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

router.put("/:id", async (req, res) => {
  let company;
  const { id } = req.params;
  const { name, description, code, companyId, taxation } = req.body;
  if (!name || !description || !code || !companyId) {
    res.status(400).json({ message: "bad resquest" });
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

router.delete("/:id", deleteProject);

module.exports = router;
