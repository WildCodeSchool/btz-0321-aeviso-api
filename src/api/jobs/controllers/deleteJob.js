const prisma = require("../../../../prismaClient");

/**
 * DELETE /api/v1/jobs/{id}
 * @summary Delete one job
 * @tags jobs
 * @param {string} id.path - id of wanted jobs
 * @return {object} 204 - No content
 */

const deleteJob = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.job.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(404);
    next(err);
  }
};
module.exports = deleteJob;
