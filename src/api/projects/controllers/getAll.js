const prisma = require("../../../../prismaClient");

const getAll = async (req, res) => {
  const limit = +req.query.limit;
  const projects = await prisma.project.findMany({ take: limit || undefined });
  return res.status(200).json(projects);
};
module.exports = getAll;
