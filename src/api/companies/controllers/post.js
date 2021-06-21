const prisma = require("../../../../prismaClient");

/**
 * POST /api/v1/companies
 * @summary Create one company
 * @tags companies
 * @param {PostCompany} request.body.required - Company info
 * @return {DisplayCompany} 201 - Company successfully created
 */

module.exports = async (req, res, next) => {
  const { name, logoUrl } = req.body;

  try {
    const company = await prisma.company.create({
      data: {
        name,
        logoUrl,
      },
    });

    res.status(201).json(company);
  } catch (error) {
    res.status(404);

    next(error);
  }
};
