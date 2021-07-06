const prisma = require("../../../../prismaClient");

const getUsers = async (req, res, next) => {
  const { id } = req.params;
  try {
    const users = await prisma.user.findMany({
      where: {
        projects: {
          some: {
            id,
          },
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        weeklyBasis: true,
        jobId: true,
        email: true,
      },
    });
    return res.status(200).json(users);
  } catch (e) {
    res.status(500);
    return next(e);
  }
};
module.exports = getUsers;
