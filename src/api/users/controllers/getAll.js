const prisma = require("../../../../prismaClient");

const getAll = async (req, res) => {
  const limit = +req.query.limit;
  const users = await prisma.user.findMany({
    take: limit || undefined,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      weeklyBasis: true,
    },
  });
  return res.status(200).json(users);
};
module.exports = getAll;
