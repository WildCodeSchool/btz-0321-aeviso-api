const prisma = require("../../../../prismaClient");

const me = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.user.email,
      },
    });

    delete user.password;

    if (!user) {
      res.status(401);

      throw new Error({
        message_en: "Unknown user",
        message_fr: "Utilisateur inconnu",
      });
    }

    return res.status(200).json({ user });
  } catch (e) {
    res.status(401);

    return next(e);
  }
};

module.exports = me;
