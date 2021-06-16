const prisma = require("../../../../prismaClient");

module.exports = async (req, res) => {
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
  } catch (errror) {
    res.status(404);

    next(error);
  }
};
