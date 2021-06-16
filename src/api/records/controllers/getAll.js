const prisma = require("../../../../prismaClient");

module.exports = async (req, res, next) => {
  try {
    const records = await prisma.record.findMany();

    res.status(200).json(records);
  } catch (error) {
    next(error);
  }
};
