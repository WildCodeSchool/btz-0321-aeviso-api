const prisma = require("../../../../prismaClient");

/**
 * POST /api/v1/users
 * @summary Create one user
 * @tags users
 * @param {PostUser} request.body.required - User info
 * @return {DisplayUser} 201 - User successfully created
 */
const post = async (req, res, next) => {
  let company;
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    weeklyBasis,
    companyId,
    jobId,
  } = req.body;
  try {
    if (companyId) {
      company = {
        connect: {
          id: companyId,
        },
      };
    }
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        role,
        weeklyBasis,
        company,
        job: {
          connect: {
            id: jobId,
          },
        },
      },
    });
    res.status(201).json(user);
  } catch (e) {
    res.status(422);
    next(e);
  }
};
module.exports = post;
