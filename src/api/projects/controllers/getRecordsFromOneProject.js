const errors = require("../../errors");
const prisma = require("../../../../prismaClient");

const getRecordsFromOneProject = async (req, res, next) => {
  const { projectId } = req.params;
  const { start, end } = req.query;
  try {
    const result = await prisma.record.find({
      where: {
        projectId,
      },
    });
    if (result) res.status(200).json(result);
    else res.status(404).json(errors.projects[404]);
  } catch (e) {
    res.status(400);
    next(e);
  }
};
module.exports = getRecordsFromOneProject;
