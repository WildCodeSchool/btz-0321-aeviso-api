const prisma = require("../../../../prismaClient");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { name, logoUrl } = req.body;

  try {
    const company = await prisma.company.update({
      where: {
        id,
      },
      data: {
        name,
        logoUrl,
      },
    });

    res.status(200).json(company);
  } catch (error) {
    res.status(404);

    next(error);
  }
};
