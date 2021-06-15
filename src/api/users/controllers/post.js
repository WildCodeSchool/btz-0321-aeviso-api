const errors = require("../../errors");
const prisma = require("../../../../prismaClient");

const post = async (req, res) => {
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
    return res.status(201).json(user);
  } catch (e) {
    return res.status(422).json(errors[e.code]);
  }
};
module.exports = post;
