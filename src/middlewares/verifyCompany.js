const prisma = require("../../prismaClient");

const verifyCompany = async (req, res, next) => {
  try {
    if (req.user?.role === "SUPERADMIN") {
      return next();
    }

    const { id: _id, companyId } = req.params;
    const id = _id || companyId;

    const user = await prisma.user.findFirst({
      where: {
        email: req.user.email,
      },
      select: {
        companyId: true,
      },
    });

    if (!user || user.companyId !== id) {
      res.status(403);

      throw new Error("You do not belong to this company.");
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = verifyCompany;
