const prisma = require("../../../../prismaClient");

const createUserProject = async (req, res, next) => {
  const { userId, projectId } = req.params;
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        projects: { connect: { id: projectId } },
      },
    });
    res.sendStatus(204);
  } catch (e) {
    res.status(404);
    next(e);
  }
};
module.exports = createUserProject;
