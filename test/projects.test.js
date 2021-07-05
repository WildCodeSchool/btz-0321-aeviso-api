const request = require("supertest");
const app = require("../src/app");
const prismaClient = require("../prismaClient");

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

const companyId = "10a61a37-17ed-4835-bf5f-e83cb24453a1"; // Replace this value with existing id in your local db

let firstProjectId;
let secondProjectId;

const projectPayload = {
  name: "R&D project",
  description: "A new R&D project to create AI",
  companyId,
  code: "AIRD",
  taxation: "CII",
};

describe("PROJECTS RESSOURCES", () => {
  it("should create a new project", async () => {
    const res = await request(app)
      .post("/api/v1/projects")
      .send(projectPayload)
      .expect(201)
      .expect("Content-Type", /json/);

    firstProjectId = res.body.id;

    expect(res.body).toHaveProperty(projectProperties[0]);
    expect(res.body).toHaveProperty(projectProperties[1], projectPayload.name);
    expect(res.body).toHaveProperty(
      projectProperties[2],
      projectPayload.description
    );
    expect(res.body).toHaveProperty(projectProperties[3]);
    expect(res.body).toHaveProperty(projectProperties[4]);
    expect(res.body).toHaveProperty(
      projectProperties[5],
      projectPayload.companyId
    );
    expect(res.body).toHaveProperty(projectProperties[6], projectPayload.code);
    expect(res.body).toHaveProperty(
      projectProperties[7],
      projectPayload.taxation
    );
  });

  it("should create a new project with default taxation NA", async () => {
    const payload = {
      name: "Other project",
      description: "Other description",
      companyId,
      code: "ORD",
    };
    const res = await request(app)
      .post("/api/v1/projects")
      .send(payload)
      .expect(201)
      .expect("Content-Type", /json/);

    secondProjectId = res.body.id;

    expect(res.body).toHaveProperty(projectProperties[0]);
    expect(res.body).toHaveProperty(projectProperties[1], payload.name);
    expect(res.body).toHaveProperty(projectProperties[2], payload.description);
    expect(res.body).toHaveProperty(projectProperties[3]);
    expect(res.body).toHaveProperty(projectProperties[4]);
    expect(res.body).toHaveProperty(projectProperties[5], payload.companyId);
    expect(res.body).toHaveProperty(projectProperties[6], payload.code);
    expect(res.body).toHaveProperty(projectProperties[7], "NA");
  });

  it("should respond with 422 status", async () => {
    const payload = {
      description: "Other description",
      companyId,
      code: "ORD",
    }; // Missing name field in body
    await request(app)
      .post("/api/v1/projects")
      .send(payload)
      .expect(422)
      .expect("Content-Type", /json/);
  });

  it("should respond with 422 status", async () => {
    const payload = {
      name: "Other project",
      description: "Other description",
      code: "ORD",
    }; // Missing companyId field in body
    await request(app)
      .post("/api/v1/projects")
      .send(payload)
      .expect(422)
      .expect("Content-Type", /json/);
  });

  it("should respond with 422 status", async () => {
    const payload = {
      name: "Other project",
      description: "Other description",
      companyId,
    }; // Missing code field in body
    await request(app)
      .post("/api/v1/projects")
      .send(payload)
      .expect(422)
      .expect("Content-Type", /json/);
  });

  it("should be an array", async () => {
    const res = await request(app)
      .get("/api/v1/projects")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);

    if (res.body) {
      res.body.forEach((project) => {
        expect(project).toHaveProperty(projectProperties[0]);
        expect(project).toHaveProperty(projectProperties[1]);
        expect(project).toHaveProperty(projectProperties[2]);
        expect(project).toHaveProperty(projectProperties[3]);
        expect(project).toHaveProperty(projectProperties[4]);
        expect(project).toHaveProperty(projectProperties[5]);
        expect(project).toHaveProperty(projectProperties[6]);
        expect(project).toHaveProperty(projectProperties[7]);
      });
    }
  });

  it("should respond 200 with one project", async () => {
    const res = await request(app)
      .get(`/api/v1/projects/${firstProjectId}`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).toHaveProperty(projectProperties[0]);
    expect(res.body).toHaveProperty(projectProperties[1], projectPayload.name);
    expect(res.body).toHaveProperty(
      projectProperties[2],
      projectPayload.description
    );
    expect(res.body).toHaveProperty(projectProperties[3]);
    expect(res.body).toHaveProperty(projectProperties[4]);
    expect(res.body).toHaveProperty(
      projectProperties[5],
      projectPayload.companyId
    );
    expect(res.body).toHaveProperty(projectProperties[6], projectPayload.code);
    expect(res.body).toHaveProperty(
      projectProperties[7],
      projectPayload.taxation
    );
  });

  it("should respond 404", async () => {
    await request(app)
      .get("/api/v1/projects/10")
      .expect(404)
      .expect("Content-Type", /json/);
  });

  it("should modify an project", async () => {
    const payload = {
      name: "Jean",
    };

    const res = await request(app)
      .put(`/api/v1/projects/${firstProjectId}`)
      .send(payload)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).toHaveProperty(projectProperties[0]);
    expect(res.body).toHaveProperty(projectProperties[1], payload.name);
    expect(res.body).toHaveProperty(
      projectProperties[2],
      projectPayload.description
    );
    expect(res.body).toHaveProperty(projectProperties[3]);
    expect(res.body).toHaveProperty(projectProperties[4]);
    expect(res.body).toHaveProperty(
      projectProperties[5],
      projectPayload.companyId
    );
    expect(res.body).toHaveProperty(projectProperties[6], projectPayload.code);
    expect(res.body).toHaveProperty(
      projectProperties[7],
      projectPayload.taxation
    );
  });

  it("should respond 404", async () => {
    const payload = {
      name: "A Project",
    };

    await request(app)
      .put("/api/v1/projects/10")
      .send(payload)
      .expect(404)
      .expect("Content-Type", /json/);
  });

  it("should delete an project", async () => {
    await request(app).delete(`/api/v1/projects/${firstProjectId}`).expect(204);
  });

  it("should delete an project", async () => {
    await request(app)
      .delete(`/api/v1/projects/${secondProjectId}`)
      .expect(204);
  });

  it("should respond 404", async () => {
    await request(app)
      .put("/api/v1/projects/10")
      .expect(404)
      .expect("Content-Type", /json/);
  });
});

afterAll(async () => {
  // noinspection JSUnresolvedFunction
  await prismaClient.$disconnect();
});
