const prisma = require("../../../../prismaClient");

const getRecordsFromUserFromProject = async (req, res, next) => {
  const { userId, projectId } = req.params;
  try {
    const allRecords = await prisma.record.findMany({
      where: {
        projectId,
        userId,
      },
    });
    res.status(200).json(allRecords);
  } catch (e) {
    res.status(404);
    next(e);
  }
};
module.exports = getRecordsFromUserFromProject;
