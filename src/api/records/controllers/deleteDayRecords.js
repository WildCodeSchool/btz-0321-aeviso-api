const prisma = require("../../../../prismaClient");

/**
 * DELETE /api/v1/records/{date}
 * @summary Delete some records
 * @tags records
 * @param {string} date.path - date of wanted records (ISO String)
 * @return {object} 204 - No content
 */

module.exports = async (req, res, next) => {
  const { date } = req.query;

  if (!date) throw new Error({ message: "Date must be specified" });

  const end = new Date(date);
  end.setDate(end.getDate() + 1);

  try {
    await prisma.record.deleteMany({
      where: { date: { gt: date, lt: end.toISOString() } },
    });

    res.sendStatus(204);
  } catch (error) {
    res.status(404);
    next(error);
  }
};
