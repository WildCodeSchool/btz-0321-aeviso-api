require("dotenv").config();
const jwt = require("jsonwebtoken");
const prisma = require("../../../../prismaClient");

const me = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "You need to Login" });
  }
  try {
    const { email } = await jwt.verify(token, process.env.SECRET);
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    delete user.password;
    return res.status(200).json({ message: "User authenticated", user });
  } catch (err) {
    res.status(500);
    return next(err);
  }
};
module.exports = me;
