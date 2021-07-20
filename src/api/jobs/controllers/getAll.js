const prisma = require("../../../../prismaClient");

/**
 * GET /api/v1/jobs
 * @summary View all jobs
 * @tags jobs
 * @return {array<DisplayJob>} 200 - Job list successfully retrieved
 */

const getAll = async (req, res, next) => {
  const limit = +req.query.limit;
  const users = req.query?.users;

  const include =
    users === "true"
      ? {
          users: {
            select: {
              id: true,
            },
          },
        }
      : undefined;

  try {
    const jobs = await prisma.job.findMany({
      take: limit || undefined,
      include,
    });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(400);
    next(error);
  }
};
module.exports = getAll;
