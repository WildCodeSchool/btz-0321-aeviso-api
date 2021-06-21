const bcrypt = require("bcrypt");
const prisma = require("../../../../prismaClient");

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
  const hashedPassword = bcrypt.hashSync(password, 10);
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
        password: hashedPassword,
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
