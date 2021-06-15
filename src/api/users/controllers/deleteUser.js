const errors = require("../../errors");
const prisma = require("../../../../prismaClient");

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    return res.status(204).json({ message: "User Deleted" });
  } catch (e) {
    return res.status(404).json(errors.users[e.code]);
  }
};
module.exports = deleteUser;
