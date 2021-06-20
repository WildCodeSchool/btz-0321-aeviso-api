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
    res.cookie("USER", user, {
      maxAge: 900000,
      httpOnly: true,
    });
    res.status(200).json({ message: "User Authenticated" });
  } catch (e) {
    res.status(400);
    next(e);
  }
};
module.exports = login;
