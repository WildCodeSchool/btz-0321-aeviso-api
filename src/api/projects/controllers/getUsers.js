const prisma = require("../../../../prismaClient");

const getUsers = async (req, res, next) => {
  const { id } = req.params;
  const { start, end } = req.query;
  try {
    const { users } = await prisma.project.findUnique({
      where: {
        id,
      },
      select: {
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            weeklyBasis: true,
            job: {
              select: {
                label: true,
              },
            },
            records: {
              where: {
                projectId: id,
                date: {
                  gt: start,
                  lt: end,
                },
              },
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
    return res.status(200).json(users);
  } catch (e) {
    res.status(500);
    return next(e);
  }
};
module.exports = getUsers;
