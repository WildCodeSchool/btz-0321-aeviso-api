const prisma = require("../../../../prismaClient");

module.exports = async (req, res, next) => {
  const { name, logoUrl } = req.body;

  try {
    const company = await prisma.company.create({
      data: {
        name,
        logoUrl,
      },
    });

    res.status(201).json(company);
  } catch (error) {
    res.status(404);

    next(error);
  }
};
