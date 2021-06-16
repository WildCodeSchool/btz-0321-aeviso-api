const prisma = require("../../../../prismaClient");

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await prisma.company.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(company);
  } catch (error) {
    res.status(404);

    next(error);
  }
};
