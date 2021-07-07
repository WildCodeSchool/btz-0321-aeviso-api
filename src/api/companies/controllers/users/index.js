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
    const { id } = req.params;
    const { role, by, order } = req.query;

    const users = await prisma.user.findMany({
      where: {
        companyId: id,
        role: role.toUpperCase(),
      },
      orderBy: {
        [by]: order,
      },
    });

    if (!users.length) {
      res.status(404);
      throw new Error(errors.users[404].message);
    }

    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};
