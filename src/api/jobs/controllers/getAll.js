const prisma = require("../../../../prismaClient");

const getAll = async (req, res) => {
  try {
    const job = await prisma.job.findMany();
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};
module.exports = getAll;
