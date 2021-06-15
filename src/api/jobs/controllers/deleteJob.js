const prisma = require("../../../../prismaClient");

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
