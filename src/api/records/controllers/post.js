const prisma = require("../../../../prismaClient");

/**
 * POST /api/v1/records
 * @summary Create one record
 * @tags records
 * @param {PostRecord} request.body.required - Record info
 * @return {DisplayRecord} 201 - Record successfully created
 */

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
