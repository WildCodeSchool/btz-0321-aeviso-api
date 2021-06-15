const prisma = require("../../../../prismaClient");

const post = async (req, res, next) => {
  const { name, description, code, taxation, companyId } = req.body;
  try {
    const project = await prisma.project.create({
      data: {
        name,
        code,
        description,
        taxation,
        company: {
          connect: {
            id: companyId,
          },
        },
      },
    });
    res.status(201).json(project);
  } catch (e) {
    res.status(422);
    next(e);
  }
};
module.exports = post;
