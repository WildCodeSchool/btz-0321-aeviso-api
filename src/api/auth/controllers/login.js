const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../../../../prismaClient");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Unknow User" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        message: "wrong password",
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
