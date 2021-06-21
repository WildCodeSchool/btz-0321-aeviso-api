const prisma = require("../../../../prismaClient");

const createProjectUser = async (req, res, next) => {
  const { userId, projectId } = req.params;
  try {
    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        users: { connect: { id: userId } },
      },
    });
    res.sendStatus(201).json({ message: "Ok done for me projects" });
  } catch (e) {
    res.status(404);
    next(e);
  }
};
module.exports = createProjectUser;
