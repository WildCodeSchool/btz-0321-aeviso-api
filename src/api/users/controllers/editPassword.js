const bcrypt = require("bcrypt");

const prisma = require("../../../../prismaClient");

/**
 * PUT /api/v1/users/{id}
 * @summary Update one user
 * @tags users
 * @param {string} id.path - id of wanted user
 * @param {CreateUser} request.body.required - User infos to update
 * @return {DisplayUser} 200 - User successfully retrieved
 */
const editSelf = async (req, res, next) => {
  try {
    const { email } = req.user;
    const { oldPassword, newPassword } = req.body;

    const oldUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        password: true,
      },
    });

    const comparePasswords = await bcrypt.compare(
      oldPassword,
      oldUser.password
    );

    if (!comparePasswords) {
      res.status(422);

      throw new Error("Old password is incorrect.");
    }

    const newUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: await bcrypt.hash(newPassword, 10),
      },
    });

    delete newUser.password;

    res.status(200).json(newUser);
  } catch (e) {
    next(e);
  }
};

module.exports = editSelf;
