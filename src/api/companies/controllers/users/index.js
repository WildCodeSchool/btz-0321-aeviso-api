const prisma = require("../../../../../prismaClient");

/**
 * GET /api/v1/companies/{id}/users
 * @summary View company's users
 * @tags companies
 * @param {string} id.path - id of wanted company
 * @return {array<DisplayUser>} 200 - Users successfully retrieved
 */

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, by, order } = req.query;

    const users = await prisma.user.findMany({
      where: {
        companyId: id,
        role: role?.toUpperCase(),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        companyId: true,
        jobId: true,
        weeklyBasis: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        [by]: order,
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};
