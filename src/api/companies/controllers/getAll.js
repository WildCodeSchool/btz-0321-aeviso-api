const prisma = require("../../../../prismaClient");

module.exports = async (req, res, next) => {
  try {
    const companies = await prisma.company.findMany();

    res.status(200).json(companies);
  } catch (error) {
    next(error);
  }
};
