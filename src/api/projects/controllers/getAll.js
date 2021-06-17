const prisma = require("../../../../prismaClient");

const getAll = async (req, res) => {
  const projects = await prisma.project.findMany();
  return res.status(200).json(projects);
};
module.exports = getAll;
