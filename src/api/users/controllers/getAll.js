const prisma = require("../../../../prismaClient");

const getAll = async (req, res) => {
  const users = await prisma.user.findMany();
  return res.status(200).json(users);
};
module.exports = getAll;
