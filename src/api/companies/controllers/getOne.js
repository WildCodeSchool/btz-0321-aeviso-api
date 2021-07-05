const prisma = require("../../../../prismaClient");

/**
 * GET /api/v1/companies/{id}
 * @summary View one company
 * @tags companies
 * @param {string} id.path - id of wanted company
 * @return {DisplayCompany} 200 - Company successfully retrieved
 */

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const company = await prisma.company.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(company);
  } catch (error) {
    res.status(404);

    next(error);
  }
};
