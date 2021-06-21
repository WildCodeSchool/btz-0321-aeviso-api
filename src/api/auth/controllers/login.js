const jwt = require("jsonwebtoken");
const prisma = require("../../../../prismaClient");

const login = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(401).json({ message: "Unknow User" });
    }
    delete user.password;
    const token = jwt.sign(
      { email: user.email, role: user.role },
      "RANDOM_TOKEN_SECRET", // For develop only. To deployment, use more crypted token)
      { expiresIn: "24h" }
    );
    res.cookie("TOKEN", token, {
      maxAge: 900000,
      httpOnly: true,
    });
    res.status(200).json({ message: "User Authenticated", user });
  } catch (e) {
    res.status(400);
    next(e);
  }
};
module.exports = login;
