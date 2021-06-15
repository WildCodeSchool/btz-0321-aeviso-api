const errors = require("../../errors");
const prisma = require("../../../../prismaClient");

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    res.status(204).json({ message: "User Deleted" });
  } catch (e) {
    res.status(404);
    next(e);
  }
};
module.exports = deleteUser;
