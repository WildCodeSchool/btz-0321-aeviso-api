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
const put = async (req, res, next) => {
  let company;
  let job;
  const { id } = req.params;
  const { firstName, lastName, email, role, weeklyBasis, companyId, jobId } =
    req.body;

  try {
    if (companyId) {
      company = {
        connect: {
          id: companyId,
        },
      };
    }
    if (companyId === null) {
      company = {
        disconnect: true,
      };
    }
    if (jobId) {
      job = {
        connect: {
          id: jobId,
        },
      };
    }
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        email,
        role,
        weeklyBasis,
        company,
        job,
      },
    });

    delete user.password;

    res.status(200).json(user);
  } catch (e) {
    res.status(404);
    next(e);
  }
};

module.exports = put;
