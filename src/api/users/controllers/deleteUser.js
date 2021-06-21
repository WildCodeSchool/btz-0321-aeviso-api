const prisma = require("../../../../prismaClient");

/**
 * DELETE /api/v1/users/{id}
 * @summary Delete one user
 * @tags users
 * @param {string} id.path - id of wanted user
 * @return {object} 204 - No content
 */
const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (e) {
    res.status(404);
    next(e);
  }
};
module.exports = deleteUser;
