const prisma = require("../../../../prismaClient");

const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.job.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(404).json({ message: "job deleted" });
  }
};
module.exports = deleteJob;
