const prisma = require("../../../../prismaClient");

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
