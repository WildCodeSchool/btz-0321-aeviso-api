const errors = require("../../errors");
const prisma = require("../../../../prismaClient");

/**
 * GET /api/v1/users/{id}
 * @summary View one user
 * @tags users
 * @param {string} id.path - id of wanted user
 * @return {DisplayUser} 200 - User successfully retrieved
 */
const getOne = async (req, res, next) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (result) res.status(200).json(result);
    else res.status(404).json(errors.users[404]);
  } catch (e) {
    res.status(400);
    next(e);
  }
};
module.exports = getOne;
