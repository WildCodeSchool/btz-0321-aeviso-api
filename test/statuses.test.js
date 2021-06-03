const request = require("supertest");

const app = require("../src/app");

describe("Statuses CRUD", () => {
  const statusesProperties = ["name"];

  it("should respond with an array of statuses", async () => {
    const res = await request(app)
      .get("/api/v1/statuses")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach((status) =>
      statusesProperties.forEach((property) =>
        expect(status).toHaveProperty(property)
      )
    );
  });

  it("should respond with one status", async () => {
    const res = await request(app)
      .get("/api/v1/statuses/2")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    statusesProperties.forEach((property) =>
      expect(res.body).toHaveProperty(property)
    );
  });

  it("should create one new status", async () => {
    const payload = { name: "EURL" };
    const res = await request(app)
      .post("/api/v1/statuses")
      .send(payload)
      .expect("Content-Type", /json/)
      .expect(201);
  });

  it("should update one status and send a validation message", async () => {
    const res = await request(app)
      .put("/api/v1/statuses/2")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);

    expect(res.body).toEqual({ message: "Status has been updated" });
  });
});
