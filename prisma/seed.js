const { PrismaClient } = require("@prisma/client");
const faker = require("faker");
const { company } = require("faker");

const prisma = new PrismaClient();

async function main() {
  const companies = [
    {
      name: faker.company.companyName(),
      logoUrl: faker.internet.avatar(),
    },
    {
      name: faker.company.companyName(),
      logoUrl: faker.internet.avatar(),
    },
  ];

  const createdCompanies = await Promise.all(
    companies.map((company) => {
      return prisma.company.create({
        data: company,
      });
    })
  );

  const jobs = [
    {
      label: faker.name.jobTitle(),
    },
    {
      label: faker.name.jobTitle(),
    },
    {
      label: faker.name.jobTitle(),
    },
  ];

  const createdJob = await Promise.all(
    jobs.map((job) => {
      return prisma.job.create({
        data: job,
      });
    })
  );

  const users = [
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      role: "USER",
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      role: "ADMIN",
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      role: "SUPERADMIN",
    },
  ];
  const createdUsers = await Promise.all(
    users.map((user) => {
      return prisma.user.create({
        data: {
          ...user,
          job: {
            connect: {
              id: createdJob[Math.floor(Math.random() * createdJob.length)].id,
            },
          },
          company: {
            connect: {
              id: createdCompanies[
                Math.floor(Math.random() * createdCompanies.length)
              ].id,
            },
          },
        },
      });
    })
  );

  const projects = [
    {
      name: faker.name.findName(),
      description: faker.lorem.text(),
      code: faker.lorem.word(),
    },
    {
      name: faker.name.findName(),
      description: faker.lorem.text(),
      code: faker.lorem.word(),
    },
    {
      name: faker.name.findName(),
      description: faker.lorem.text(),
      code: faker.lorem.word(),
    },
  ];
  const createdProjects = await Promise.all(
    projects.map((project) => {
      return prisma.project.create({
        data: {
          ...project,
          company: {
            connect: {
              id: createdCompanies[
                Math.floor(Math.random() * createdCompanies.length)
              ].id,
            },
          },
        },
      });
    })
  );

  const records = [
    {
      timeslot: "MORNING",
      comment: faker.lorem.text(),
      date: faker.datatype.datetime(),
    },
    {
      timeslot: "AFTERNOON",
      comment: faker.lorem.text(),
      date: faker.datatype.datetime(),
    },
    {
      timeslot: "MORNING",
      comment: faker.lorem.text(),
      date: faker.datatype.datetime(),
    },
  ];

  const createdRecords = await Promise.all(
    records.map((record) => {
      return prisma.record.create({
        data: {
          ...record,
          user: {
            connect: {
              id: createdUsers[Math.floor(Math.random() * createdUsers.length)]
                .id,
            },
          },
          project: {
            connect: {
              id: createdProjects[
                Math.floor(Math.random() * createdProjects.length)
              ].id,
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
