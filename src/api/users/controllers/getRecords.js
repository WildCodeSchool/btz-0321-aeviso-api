const prisma = require("../../../../prismaClient");

const getRecords = async (req, res, next) => {
  const { id } = req.params;
  try {
    const allRecords = await prisma.user
      .findUnique({
        where: {
          id,
        },
      })
      .records();
    res.status(200).json(allRecords);
  } catch (e) {
    res.status(404);
    next(e);
  }
};
module.exports = getRecords;
