const prisma = require("../../../../../prismaClient");
const errors = require("../../../errors");

/**
 * GET /api/v1/companies/{id}/users
 * @summary View company's users
 * @tags companies
 * @param {string} id.path - id of wanted company
 * @return {DisplayCompany} 200 - Users successfully retrieved
 */

module.exports = async (req, res, next) => {
  try {
    const { companyId } = req.params;
    const { role, createdAt } = req.query;

    const users = await prisma.user.findMany({
      where: {
        companyId,
        role: role.toUpperCase(),
      },
      orderBy: {
        createdAt,
      },
    });

    if (!users) {
      return res.status(404).json(errors.users[404]);
    }

    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};