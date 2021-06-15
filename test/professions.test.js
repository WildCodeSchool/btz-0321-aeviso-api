const request = require("supertest");
const app = require("../src/app");

const jobsProperties = ["id", "name"];

describe("jobsS RESSOURCES", () => {
  it("should be an array", async () => {
    const res = await request(app)
      .get("/api/v1/jobss")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach((jobs) => {
      expect(jobs).toHaveProperty(jobsProperties[0]);
      expect(jobs).toHaveProperty(jobsProperties[1]);
    });
  });

  it("should respond 200 with one jobs", async () => {
    const res = await request(app)
      .get("/api/v1/jobss/1")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).toHaveProperty(jobsProperties[0]);
    expect(res.body).toHaveProperty(jobsProperties[1]);
  });

  it("should respond 404", async () => {
    await request(app)
      .get("/api/v1/jobss/10")
      .expect(404)
      .expect("Content-Type", /json/);
  });

  it("should create a new jobs", async () => {
    const payload = {
      name: "junior",
    };

    const res = await request(app)
      .post("/api/v1/jobss")
      .send(payload)
      .expect(201)
      .expect("Content-Type", /json/);

    expect(res.body).toHaveProperty(jobsProperties[0]);
    expect(res.body).toHaveProperty(jobsProperties[1], payload.name);
  });

  // Add unique item check when db will be connected

  it("should modify a jobs", async () => {
    const payload = {
      name: "junior",
    };

    const res = await request(app)
      .put("/api/v1/jobss/1")
      .send(payload)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).toHaveProperty(jobsProperties[0]);
    expect(res.body).toHaveProperty(jobsProperties[1], payload.name);
  });

  it("should respond 404", async () => {
    const payload = {
      name: "jobs",
    };

    await request(app)
      .put("/api/v1/jobss/10")
      .send(payload)
      .expect(404)
      .expect("Content-Type", /json/);
  });

  it("should delete a jobs", async () => {
    await request(app).delete("/api/v1/jobss/1").expect(204);
  });

  it("should respond 404", async () => {
    await request(app)
      .put("/api/v1/jobss/10")
      .expect(404)
      .expect("Content-Type", /json/);
  });
});
