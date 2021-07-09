const prisma = require("../../../../prismaClient");

const getRecords = async (req, res, next) => {
  const { id } = req.params;
  try {
    const allProjects = await prisma.user
      .findUnique({
        where: {
          id,
        },
      })
      .records();
    res.status(200).json(allProjects);
  } catch (e) {
    res.status(404);
    next(e);
  }
};
module.exports = getRecords;
