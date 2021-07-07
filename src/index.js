require("dotenv").config();

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
      const company = await prisma.company.create({
        data: {
          name: "AeViso",
        },
      });

      const job = await prisma.job.create({
        data: {
          label: process.env.USER_JOB,
        },
      });

      await prisma.user.create({
        data: {
          firstName: process.env.USER_FIRSTNAME,
          lastName: process.env.USER_LASTNAME,
          email: process.env.USER_EMAIL,
          password: process.env.USER_PASSWORD,
          role: "SUPERADMIN",
          companyId: company.id,
          jobId: job.id,
          weeklyBasis: "h35",
        },
      });

      console.log(`Created new user with email ${process.env.USER_EMAIL}`);
    }
  }
);
