const prisma = require("../../../../prismaClient");

/**
 * DELETE /api/v1/records/{id}
 * @summary Delete one record
 * @tags records
 * @param {string} id.path - id of wanted record
 * @return {object} 204 - No content
 */

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.record.delete({
      where: {
        id,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    res.status(404);

    next(error);
  }
};
