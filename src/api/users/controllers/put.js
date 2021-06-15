const errors = require("../../errors");
const prisma = require("../../../../prismaClient");

const put = async (req, res) => {
  let company;
  let job;
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
        password,
        role,
        weeklyBasis,
        company,
        job,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(404).json(errors.users[e.code]);
  }
};

module.exports = put;