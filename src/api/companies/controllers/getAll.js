const prisma = require("../../../../prismaClient");

/**
 * GET /api/v1/companies
 * @summary View all companies
 * @tags companies
 * @return {array<DisplayCompany>} 200 - Company list successfully retrieved
 */

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
