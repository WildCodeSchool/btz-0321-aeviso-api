const { PrismaClient } = require("@prisma/client");
const faker = require("faker");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const companies = new Array(5).fill("").map(() => ({
    name: faker.company.companyName(),
    logoUrl: faker.internet.avatar(),
    users: new Array(10).fill("").map((_, i) => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      role: i === 0 ? "ADMIN" : "USER",
      password: bcrypt.hashSync("password", 10),
    })),
  }));
  const jobs = new Array(5).fill("").map(() => ({
    label: faker.name.jobTitle(),
  }));
  const projects = new Array(25).fill("").map(() => ({
    name: faker.name.findName(),
    description: faker.lorem.text(),
    code: faker.lorem.word(),
  }));

  const records = new Array(500).fill("").map(() => ({
    timeslot: Math.random() > 0.5 ? "MORNING" : "AFTERNOON",
    comment: faker.lorem.text(15),
    date: faker.date.recent(30, new Date()),
  }));

  const createdJobs = await Promise.all(
    jobs.map((j) => {
      return prisma.job.create({
        data: j,
      });
    })
  );

  await Promise.all(
    companies.map((c, i) => {
      return prisma.company.create({
        data: {
          name: c.name,
          logoUrl: c.logoUrl,
          users: {
            createMany: {
              data: c.users.map((u) => ({
                ...u,
                jobId:
                  createdJobs[Math.floor(Math.random() * createdJobs.length)]
                    .id,
              })),
            },
          },
          projects: {
            createMany: {
              data: projects.slice(
                i * companies.length,
                i * companies.length + 5
              ),
            },
          },
        },
      });
    })
  );

  // const usersFromDB = await prisma.user.findMany();

  const companiesFromDB = await prisma.company.findMany({
    include: {
      users: true,
      projects: true,
    },
  });

  await Promise.all(
    companiesFromDB.flatMap((c) => {
      return c.users.map((u) => {
        return prisma.user.update({
          data: {
            projects: {
              connect: {
                id: c.projects[Math.floor(Math.random() * c.projects.length)]
                  .id,
              },
            },
          },
          where: {
            id: u.id,
          },
        });
      });
    })
  );

  const usersWithProjects = await prisma.user.findMany({
    include: {
      projects: true,
    },
  });

  await Promise.all(
    usersWithProjects.map((u, i) => {
      return prisma.user.update({
        where: {
          id: u.id,
        },
        data: {
          records: {
            createMany: {
              data: records
                .slice(i * 10, i * 10 + Math.floor(Math.random() * 13))
                .map((r) => ({
                  ...r,
                  projectId: u.projects[0].id,
                })),
            },
          },
        },
      });
    })
  );
}

main().finally(async () => {
  await prisma.$disconnect();
});
