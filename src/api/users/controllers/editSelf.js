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
    const { email: oldEmail } = req.user;
    const { firstName, lastName, email: newEmail } = req.body;

    console.log(oldEmail, newEmail);

    const user = await prisma.user.update({
      where: {
        email: oldEmail,
      },
      data: {
        firstName,
        lastName,
        email: newEmail,
      },
    });

    delete user.password;

    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

module.exports = editSelf;
