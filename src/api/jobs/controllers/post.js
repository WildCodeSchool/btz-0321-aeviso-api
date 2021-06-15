const prisma = require("../../../../prismaClient");

const post = async (req, res) => {
  const { label } = req.body;
  try {
    const job = await prisma.job.create({
      data: {
        label,
      },
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(404).json(err);
  }
};
module.exports = post;
