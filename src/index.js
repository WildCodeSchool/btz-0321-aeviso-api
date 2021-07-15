require("dotenv").config();

const bcrypt = require("bcrypt");

const app = require("./app");
const prisma = require("../prismaClient");

const {
  PORT,
  HOST,
  USER_EMAIL,
  USER_FIRSTNAME,
  USER_JOB,
  USER_LASTNAME,
  USER_PASSWORD,
} = process.env;

const port = PORT || 6000;
const host = HOST || "localhost";

app.listen(
  {
    host,
    port,
  },
  async () => {
    // eslint-disable-next-line no-console
    console.log(`Listening: http://${host}:${port}`);

    const user = await prisma.user.count({
      where: {
        role: "SUPERADMIN",
      },
    });

    if (!user) {
      const job = {
        label: USER_JOB || "SUPERADMIN",
      };

      const { email } = await prisma.user.create({
        data: {
          firstName: USER_FIRSTNAME || "Super",
          lastName: USER_LASTNAME || "Admin",
          email: USER_EMAIL || "superadmin@dev.fr",
          password: bcrypt.hashSync(USER_PASSWORD || "password", 10),
          role: "SUPERADMIN",
          job: {
            create: job,
          },
          weeklyBasis: "h35",
        },
      });

      // eslint-disable-next-line no-console
      console.log(`⚡️ No SUPERADMIN found, created a generic one : ${email}`);
    }
  }
);
