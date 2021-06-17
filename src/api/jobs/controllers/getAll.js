const prisma = require("../../../../prismaClient");

const getAll = async (req, res, next) => {
  try {
    const jobs = await prisma.job.findMany();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400);
    next(error);
  }
};
module.exports = getAll;
