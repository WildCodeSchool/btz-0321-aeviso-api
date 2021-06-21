const prisma = require("../../../../prismaClient");

/**
 * POST /api/v1/jobs
 * @summary Create one job
 * @tags jobs
 * @param {PostJob} request.body.required - Job info
 * @return {DisplayJob} 201 - Job successfully created
 */

const post = async (req, res, next) => {
  const { label } = req.body;
  try {
    const job = await prisma.job.create({
      data: {
        label,
      },
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(404);
    next(err);
  }
};
module.exports = post;
