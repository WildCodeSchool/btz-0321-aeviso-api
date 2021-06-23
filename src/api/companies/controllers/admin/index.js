const prisma = require("../../../../../prismaClient");

/**
 * GET /api/v1/companies/{id}/admin
 * @summary View company's admin
 * @tags companies
 * @param {string} id.path - id of wanted company
 * @return {DisplayCompany} 200 - Admin successfully retrieved
 */

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        companyId: id,
        role: "ADMIN",
      },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(404);

    next(error);
  }
};
