const prisma = require("../../../../prismaClient");

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const record = await prisma.record.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(record);
  } catch (error) {
    res.status(404);

    next(error);
  }
};
