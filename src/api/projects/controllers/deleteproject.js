const errors = require("../../errors");
const prisma = require("../../../../prismaClient");

const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({
      where: {
        id,
      },
    });
    res.status(204).json(errors.projects[204]);
  } catch (e) {
    res.status(404).json(errors.users[e.code]);
  }
};
module.exports = deleteProject;
