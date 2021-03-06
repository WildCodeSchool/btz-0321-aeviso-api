const request = require("supertest");
const faker = require("faker");

const app = require("../src/app");
const prismaClient = require("../prismaClient");

const companiesProperties = ["id", "name", "logoUrl", "createdAt", "updatedAt"];
const projectProperties = [
  "id",
  "name",
  "description",
  "createdAt",
  "updatedAt",
  "companyId",
  "code",
  "taxation",
];

const randomCompany = async (property) => {
  const companies = await prismaClient.company.findMany();
  const company = companies[Math.floor(Math.random() * companies.length)];

  if (property) return company[property];

  return company;
};

describe("Companies CRUD", () => {
  it("should respond with an array of companies", async () => {
    const res = await request(app)
      .get("/api/v1/companies")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach((company) => {
      companiesProperties.forEach((property) =>
        expect(company).toHaveProperty(property)
      );

      expect(company.id).toMatch(
        /^[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}$/
      );
    });
  });

  it("should create a company and respond with it", async () => {
    const payload = {
      name: "Estleuh",
      logoUrl: "https://google.com",
    };

    const res = await request(app)
      .post("/api/v1/companies")
      .set("Accept", "application/json")
      .send(payload)
      .expect("Content-Type", /json/)
      .expect(201);

    companiesProperties.forEach((property) =>
      expect(res.body).toHaveProperty(property)
    );
  });

  it("should respond with a company", async () => {
    const res = await request(app)
      .get(`/api/v1/companies/${await randomCompany("id")}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    companiesProperties.forEach((property) =>
      expect(res.body).toHaveProperty(property)
    );

    expect(res.body.id).toMatch(
      /^[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}$/
    );
  });

  it("should update a company and respond with it", async () => {
    const payload = {
      name: "Lorem Ipsum",
      logoUrl: "https://source.unsplash.com/random",
    };

    const res = await request(app)
      .put(`/api/v1/companies/${await randomCompany("id")}`)
      .set("Accept", "application/json")
      .send(payload)
      .expect("Content-Type", /json/)
      .expect(200);

    companiesProperties.forEach((property) =>
      expect(res.body).toHaveProperty(property)
    );

    expect(res.body.id).toMatch(
      /^[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}$/
    );
  });

  it("should delete a company and not respond", async () => {
    const createdCompany = await prismaClient.company.create({
      data: {
        name: faker.company.companyName(),
      },
    });

    await request(app)
      .delete(`/api/v1/companies/${createdCompany.id}`)
      .expect(204);
  });

  it("should be an array of projects from one company and respond with status 200", async () => {
    const res = await request(app)
      .get(`/api/v1/companies/${await randomCompany("id")}/projects`)
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach((project) => {
      projectProperties.forEach((property) =>
        expect(project).toHaveProperty(property)
      );

      expect(project.id).toMatch(
        /^[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}$/
      );
    });
  });

  afterAll(async () => {
    // noinspection JSUnresolvedFunction
    await prismaClient.$disconnect();
  });
});
