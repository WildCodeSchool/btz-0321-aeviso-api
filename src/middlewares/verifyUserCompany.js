const prisma = require("../../prismaClient");

const verifyUserCompany = async (req, res, next) => {
  try {
    if (req.user?.role === "SUPERADMIN") {
      return next();
    }

    const { id } = req.params;

    const userModifying = await prisma.user.findFirst({
      where: {
        email: req.user.email,
      },
      select: {
        companyId: true,
      },
    });

    const userModified = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        companyId: true,
      },
    });

    if (!userModifying || userModifying.companyId !== userModified.companyId) {
      res.status(403);

      throw new Error("You do not belong to this company.");
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = verifyUserCompany;
