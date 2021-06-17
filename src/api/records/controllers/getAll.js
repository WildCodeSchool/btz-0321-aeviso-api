const prisma = require("../../../../prismaClient");

module.exports = async (req, res, next) => {
  const limit = +req.query.limit;
  try {
    const records = await prisma.record.findMany({ take: limit || undefined });

    res.status(200).json(records);
  } catch (error) {
    next(error);
  }
};
