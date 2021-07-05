const prisma = require("../../../../prismaClient");

/**
 * GET /api/v1/projects
 * @summary View all projects
 * @tags projects
 * @return {array<DisplayProject>} 200 - Project list successfully retrieved
 */

const getAll = async (req, res) => {
  const limit = +req.query.limit;
  const projects = await prisma.project.findMany({ take: limit || undefined });
  return res.status(200).json(projects);
};
module.exports = getAll;
