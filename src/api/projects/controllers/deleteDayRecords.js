const prisma = require("../../../../prismaClient");

/**
 * DELETE /api/v1/projects/{projectId}/users/{userId}/records?date=isoStringDate
 * @summary Delete some records
 * @tags projects
 * @param {string} projectId.path - id of wanted project
 * @param {string} userId.path - id of wanted user in this project
 * @param {string} date.path - query string to filter day (ISO String)
 * @return {object} 204 - No content
 */

const deleteDayRecords = async (req, res, next) => {
  const { projectId, userId } = req.params;
  const { date } = req.query;

  if (!projectId || !userId)
    throw new Error({ message: "Check url parameters" });

  if (!date) throw new Error({ message: "Date must be specified" });

  const end = new Date(date);
  end.setDate(end.getDate() + 1);

  try {
    await prisma.record.deleteMany({
      where: { userId, projectId, date: { gt: date, lt: end.toISOString() } },
    });

    res.sendStatus(204);
  } catch (error) {
    res.status(404);
    next(error);
  }
};

module.exports = deleteDayRecords;
