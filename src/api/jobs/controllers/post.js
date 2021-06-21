const prisma = require("../../../../prismaClient");

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
