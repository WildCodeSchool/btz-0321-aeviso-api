const prisma = require("../../../../prismaClient");

/**
 * GET /api/v1/users
 * @summary View all users
 * @tags users
 * @return {array<DisplayUser>} 200 - User list successfully retrieved
 */
const getAll = async (req, res) => {
  const users = await prisma.user.findMany();
  return res.status(200).json(users);
};
module.exports = getAll;
