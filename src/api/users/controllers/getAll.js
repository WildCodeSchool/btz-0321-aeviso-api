const prisma = require("../../../../prismaClient");

const getAll = async (req, res) => {
  const limit = +req.query.limit;
  const users = await prisma.user.findMany({ take: limit || undefined });
  return res.status(200).json(users);
};
module.exports = getAll;
