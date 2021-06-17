const prisma = require("../../../../prismaClient");

const deleteProjectUser = async (req, res, next) => {
  const { userId, projectId } = req.params;
  try {
    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        users: { disconnect: { id: userId } },
      },
    });
    res.sendStatus(204);
  } catch (e) {
    res.status(404);
    next(e);
  }
};
module.exports = deleteProjectUser;
