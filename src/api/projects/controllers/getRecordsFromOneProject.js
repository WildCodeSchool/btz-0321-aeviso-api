const errors = require("../../errors");
const prisma = require("../../../../prismaClient");

const getRecordsFromOneProject = async (req, res, next) => {
  const { projectId } = req.params;
  const { start, end } = req.query;
  try {
    const result = await prisma.record.findMany({
      where: {
        projectId,
        date: {
          gt: start,
          lt: end,
        },
      },
    });
    if (!result) return res.status(404).json(errors.projects[404]);
    return res.status(200).json(result);
  } catch (e) {
    res.status(400);
    return next(e);
  }
};
module.exports = getRecordsFromOneProject;
