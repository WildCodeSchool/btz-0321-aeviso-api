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
    res.status(200).json({ user });
  } catch (e) {
    res.status(400);
    next(e);
  }
};
module.exports = login;
