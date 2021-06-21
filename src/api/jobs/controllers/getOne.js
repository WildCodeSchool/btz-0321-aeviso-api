const prisma = require("../../../../prismaClient");

/**
 * GET /api/v1/jobs/{id}
 * @summary View one job
 * @tags jobs
 * @param {string} id.path - id of wanted job
 * @return {DisplayJob} 200 - Job successfully retrieved
 */

const getOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await prisma.job.findUnique({
      where: {
        id,
      },
    });
    if (job) res.status(200).json(job);
    else res.status(404).json({ message: "No job found" });
  } catch (err) {
    res.status(404);
    next(err);
  }
};
module.exports = getOne;
