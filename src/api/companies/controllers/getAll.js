const prisma = require("../../../../prismaClient");

module.exports = async (req, res, next) => {
  const limit = +req.query.limit;
  try {
    const companies = await prisma.company.findMany({
      take: limit || undefined,
    });

    res.status(200).json(companies);
  } catch (error) {
    next(error);
  }
};
