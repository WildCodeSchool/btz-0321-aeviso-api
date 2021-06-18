const prisma = require("../../../../prismaClient");

/**
 * GET /api/v1/records
 * @summary View all records
 * @tags records
 * @return {array<DisplayRecordr>} 200 - Record list successfully retrieved
 */

module.exports = async (req, res, next) => {
  const limit = +req.query.limit;
  try {
    const records = await prisma.record.findMany({ take: limit || undefined });

    res.status(200).json(records);
  } catch (error) {
    next(error);
  }
};
