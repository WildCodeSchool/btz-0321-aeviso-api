const bcrypt = require("bcrypt");
const prisma = require("../../../../prismaClient");

const put = async (req, res, next) => {
  let company;
  let job;
  let hashedPassword;
  const { id } = req.params;
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

  if (password) hashedPassword = bcrypt.hashSync(password, 10);

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
        password: hashedPassword,
        role,
        weeklyBasis,
        company,
        job,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(404);
    next(e);
  }
};

module.exports = put;
