const prisma = require("../../../../prismaClient");

/**
 * POST /api/v1/records
 * @summary Create one record
 * @tags records
 * @param {PostRecord} request.body.required - Record info
 * @return {DisplayRecord} 201 - Record successfully created
 */

module.exports = async (req, res, next) => {
  try {
    const { date, timeslot, comment, userId, projectId } = req.body;

    const records = await prisma.record.findMany({
      where: {
        date,
        userId,
      },
    });

    const checkTimeslot = () => {
      return records.some((record) => record.timeslot === timeslot);
    };

    const checkRecords = () => {
      return (
        records.length === 2 &&
        records[0]?.timeslot === "MORNING" &&
        records[0]?.timeslot === "AFTERNOON"
      );
    };

    if (checkTimeslot()) {
      res.status(400);

      throw new Error("A record already exists for this timeslot.");
    }

    if (checkRecords()) {
      res.status(400);

      throw new Error("Two records already exist for this day.");
    }

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
    next(error);
  }
};
