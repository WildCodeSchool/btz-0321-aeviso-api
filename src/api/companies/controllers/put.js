const prisma = require("../../../../prismaClient");

/**
 * PUT /api/v1/companies/{id}
 * @summary Update one company
 * @tags companies
 * @param {string} id.path - id of wanted company
 * @param {CreatedCompany} request.body.required - Company infos to update
 * @return {DisplayCompany} 200 - Company successfully retrieved
 */

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { name, logoUrl } = req.body;

  try {
    const company = await prisma.company.update({
      where: {
        id,
      },
      data: {
        name,
        logoUrl,
      },
    });

    res.status(200).json(company);
  } catch (error) {
    res.status(404);

    next(error);
  }
};
