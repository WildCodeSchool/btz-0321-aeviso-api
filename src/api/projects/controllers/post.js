const errors = require("../../errors");
const prisma = require("../../../../prismaClient");

const post = async (req, res) => {
  const { name, description, code, taxation, companyId } = req.body;
  if (!name || !code || !companyId) {
    return res.status(400).json(errors[400]);
  }
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
    return res.status(201).json(project);
  } catch (e) {
    return res.status(400).json(errors.projects[e.code]);
  }
};
module.exports = post;
