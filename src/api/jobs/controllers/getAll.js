const prisma = require("../../../../prismaClient");

const getAll = async (req, res, next) => {
  const limit = +req.query.limit;
  try {
    const jobs = await prisma.job.findMany({ take: limit || undefined });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400);
    next(error);
  }
};
module.exports = getAll;
