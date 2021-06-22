const errors = require("../../errors");
const prisma = require("../../../../prismaClient");

const getOne = async (req, res, next) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        weeklyBasis: true,
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
