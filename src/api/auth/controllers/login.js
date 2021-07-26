const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../../../../prismaClient");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (!user) {
      return res.status(401).json({
        message_en: "Unknow User",
        message_fr: "Utilisateur inconnu",
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        message_en: "Wrong password",
        message_fr: "Mot de passe incorrect",
      });
    }

    delete user.password;

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      maxAge: 86_400_000,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
    });

    return res.status(200).json({ message: "User Authenticated", user });
  } catch (e) {
    res.status(400);
    return next(e);
  }
};
module.exports = login;
