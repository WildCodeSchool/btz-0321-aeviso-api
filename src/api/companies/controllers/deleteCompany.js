const prisma = require("../../../../prismaClient");

/**
 * DELETE /api/v1/companies/{id}
 * @summary Delete one company
 * @tags companies
 * @param {string} id.path - id of wanted company
 * @return {object} 204 - No content
 */

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.company.delete({
      where: {
        id,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
