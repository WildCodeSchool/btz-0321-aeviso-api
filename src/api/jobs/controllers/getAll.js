const prisma = require("../../../../prismaClient");

const getAll = async (req, res, next) => {
  try {
    const job = await prisma.job.findMany();
    res.status(200).json(job);
  } catch (error) {
    res.status(400);
    next(error);
  }
};
module.exports = getAll;
