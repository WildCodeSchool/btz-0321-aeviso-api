const prisma = require("../../../../prismaClient");

/**
 * PUT /api/v1/jobs/{id}
 * @summary Update one job
 * @tags jobs
 * @param {string} id.path - id of wanted job
 * @param {CreateJob} request.body.required - Job infos to update
 * @return {DisplayJob} 200 - Job successfully retrieved
 */

const put = async (req, res, next) => {
  const { id } = req.params;
  const { label } = req.body;
  if (!label) {
    res.status(400).json({ message: "No job found" });
  } else {
    try {
      const job = await prisma.job.update({
        data: {
          label,
        },
        where: {
          id,
        },
      });
      res.status(200).json(job);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }
};
module.exports = put;
