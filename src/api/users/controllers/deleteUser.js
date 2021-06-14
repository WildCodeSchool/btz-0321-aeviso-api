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
    res.status(204).json(errors.users[204]);
  } catch (e) {
    res.status(404).json(errors.users[e.code]);
  }
};
module.exports = deleteUser;
