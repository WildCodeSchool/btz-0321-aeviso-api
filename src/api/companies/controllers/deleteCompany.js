const prisma = require("../../../../prismaClient");

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
