const jwt = require("jsonwebtoken");
const prisma = require("../../prismaClient");

module.exports = async function verifyToken(req, res, next) {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("You need to login.");
    }

    const { email } = await jwt.verify(token, process.env.SECRET);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    delete user.password;

    return next();
  } catch (err) {
    res.status(401);

    return next(err);
  }
};
