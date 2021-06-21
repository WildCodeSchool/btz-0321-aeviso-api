const prisma = require("../../../../prismaClient");

module.exports = async (req, res, next) => {
  const { date, timeslot, comment, userId, projectId } = req.body;

  try {
    const record = await prisma.record.create({
      data: {
        date,
        timeslot,
        comment,
        user: {
          connect: {
            id: userId,
          },
        },
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(404);

    next(error);
  }
};
