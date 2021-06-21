const request = require("supertest");
const app = require("../src/app");
const prismaClient = require("../prismaClient");

const jobsProperties = ["id", "label"];

let jobCreatedId;

const jobPayload = {
  label: "Dev Junior",
};

describe("JOBS RESSOURCES", () => {
  it("should create a new job", async () => {
    const res = await request(app)
      .post("/api/v1/jobs")
      .send(jobPayload)
      .expect(201)
      .expect("Content-Type", /json/);

    jobCreatedId = res.body.id;

    expect(res.body).toHaveProperty(jobsProperties[0]);
    expect(res.body).toHaveProperty(jobsProperties[1], jobPayload.label);
  });

  it("should respond with 422 status", async () => {
    const payload = {
      random: "Dev",
    }; // Missing name field in body
    await request(app)
      .post("/api/v1/jobs")
      .send(payload)
      .expect(404)
      .expect("Content-Type", /json/);
  });

  it("should be an array", async () => {
    const res = await request(app)
      .get("/api/v1/jobs")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);

    if (res.body) {
      res.body.forEach((user) => {
        expect(user).toHaveProperty(jobsProperties[0]);
        expect(user).toHaveProperty(jobsProperties[1]);
      });
    }
  });

  it("should respond 200 with one job", async () => {
    const res = await request(app)
      .get(`/api/v1/jobs/${jobCreatedId}`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).toHaveProperty(jobsProperties[0]);
    expect(res.body).toHaveProperty(jobsProperties[1], jobPayload.label);
  });

  it("should respond 404", async () => {
    await request(app)
      .get("/api/v1/jobs/10")
      .expect(404)
      .expect("Content-Type", /json/);
  });

  it("should modify a job", async () => {
    const payload = {
      label: "Designer UI/UX",
    };

    const res = await request(app)
      .put(`/api/v1/jobs/${jobCreatedId}`)
      .send(payload)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).toHaveProperty(jobsProperties[0]);
    expect(res.body).toHaveProperty(jobsProperties[1], payload.label);
  });

  it("should respond 404", async () => {
    const payload = {
      label: "Lead dev",
    };

    await request(app)
      .put("/api/v1/jobs/10")
      .send(payload)
      .expect(404)
      .expect("Content-Type", /json/);
  });

  it("should delete a job", async () => {
    await request(app).delete(`/api/v1/jobs/${jobCreatedId}`).expect(204);
  });

  it("should respond 404", async () => {
    await request(app)
      .put("/api/v1/jobs/10")
      .expect(400)
      .expect("Content-Type", /json/);
  });
});

afterAll(async () => {
  // noinspection JSUnresolvedFunction
  await prismaClient.$disconnect();
});
