const prisma = require("../../../../prismaClient");

const getRecordsFromUserFromProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.project.findUnique({
      where: {
        id,
      },
    });
    res.sendStatus(200);
  } catch (e) {
    res.status(404);
    next(e);
  }
};
module.exports = getRecordsFromUserFromProject;
