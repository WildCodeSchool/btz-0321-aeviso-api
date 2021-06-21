const prisma = require("../../../../prismaClient");

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
