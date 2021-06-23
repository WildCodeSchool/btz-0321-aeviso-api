const prisma = require("../../../../prismaClient");

const getUsers = async (req, res) => {
  const { id } = req.params;
  const { start, end } = req.query;
  const users = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
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
};
module.exports = getUsers;
