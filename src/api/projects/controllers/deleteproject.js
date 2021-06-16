const prisma = require("../../../../prismaClient");

const deleteProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (e) {
    res.status(404);
    next(e);
  }
};
module.exports = deleteProject;
