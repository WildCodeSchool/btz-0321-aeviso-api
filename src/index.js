require("dotenv").config();

const bcrypt = require("bcrypt");

const app = require("./app");
const prisma = require("../prismaClient");

const port = process.env.PORT || 6000;
const host = process.env.HOST || "localhost";

app.listen(
  {
    host: process.env.HOST,
    port,
  },
  async () => {
    // eslint-disable-next-line no-console
    console.log(`Listening: http://${host}:${port}`);

    const user = await prisma.user.findUnique({
      where: {
        email: process.env.USER_EMAIL,
      },
    });

    if (!user) {
      const company = {
        name: "AeViso",
      };

      const job = {
        label: process.env.USER_JOB,
      };

      await prisma.user.create({
        data: {
          firstName: process.env.USER_FIRSTNAME,
          lastName: process.env.USER_LASTNAME,
          email: process.env.USER_EMAIL,
          password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
          role: "ADMIN",
          job: {
            create: job,
          },
          weeklyBasis: "h35",
          company: {
            create: company,
          },
        },
      });

      // eslint-disable-next-line no-console
      console.log(`Created new user with email ${process.env.USER_EMAIL}`);
    }
  }
);
