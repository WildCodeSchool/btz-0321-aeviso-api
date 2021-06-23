const prisma = require("../../../../prismaClient");

const getRecordsFromUserFromProject = async (req, res, next) => {
  const { userId, projectId } = req.params;
  const { start, end } = req.query;
  try {
    const allRecords = await prisma.record.findMany({
      where: {
        projectId,
        userId,
        date: {
          gt: start,
          lt: end,
        },
      },
    });
    res.status(200).json(allRecords);
  } catch (e) {
    res.status(404);
    next(e);
  }
};
module.exports = getRecordsFromUserFromProject;
