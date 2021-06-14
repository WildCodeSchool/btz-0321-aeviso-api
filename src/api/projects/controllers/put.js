const errors = require("../../errors");
const prisma = require("../../../../prismaClient");

const put = async (req, res) => {
  const { id } = req.params;
  const { name, description, code, taxation } = req.body;

  try {
    const project = await prisma.project.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        code,
        taxation,
      },
    });
    res.status(200).json(project);
  } catch (e) {
    res.status(404).json(errors.projects[e.code]);
  }
};

module.exports = put;
