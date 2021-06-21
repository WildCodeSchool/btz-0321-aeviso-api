const prisma = require("../../../../prismaClient");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { timeslot, comment } = req.body;

  try {
    const record = await prisma.record.update({
      where: {
        id,
      },
      data: {
        timeslot,
        comment,
      },
    });

    res.status(200).json(record);
  } catch (error) {
    res.status(404);

    next(error);
  }
};
