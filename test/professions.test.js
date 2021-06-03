const request = require("supertest");
const app = require("../src/app");

const professionProperties = ["id", "name"];

describe("PROFESSIONS RESSOURCES", () => {
  it("should be an array", async () => {
    const res = await request(app)
      .get("/api/v1/professions")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach((profession) => {
      expect(profession).toHaveProperty(professionProperties[0]);
      expect(profession).toHaveProperty(professionProperties[1]);
    });
  });

  it("should respond 200 with one profession", async () => {
    const res = await request(app)
      .get("/api/v1/professions/1")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).toHaveProperty(professionProperties[0]);
    expect(res.body).toHaveProperty(professionProperties[1]);
  });

  it("should respond 404", async () => {
    await request(app)
      .get("/api/v1/professions/10")
      .expect(404)
      .expect("Content-Type", /json/);
  });

  it("should create a new profession", async () => {
    const payload = {
      name: "junior",
    };

    const res = await request(app)
      .post("/api/v1/professions")
      .send(payload)
      .expect(201)
      .expect("Content-Type", /json/);

    expect(res.body).toHaveProperty(professionProperties[0]);
    expect(res.body).toHaveProperty(professionProperties[1], payload.name);
  });

  // Add unique item check when db will be connected

  it("should modify a profession", async () => {
    const payload = {
      name: "junior",
    };

    const res = await request(app)
      .put("/api/v1/professions/1")
      .send(payload)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).toHaveProperty(professionProperties[0]);
    expect(res.body).toHaveProperty(professionProperties[1], payload.name);
  });

  it("should respond 404", async () => {
    const payload = {
      name: "profession",
    };

    await request(app)
      .put("/api/v1/professions/10")
      .send(payload)
      .expect(404)
      .expect("Content-Type", /json/);
  });

  it("should delete a profession", async () => {
    await request(app).delete("/api/v1/professions/1").expect(204);
  });

  it("should respond 404", async () => {
    await request(app)
      .put("/api/v1/professions/10")
      .expect(404)
      .expect("Content-Type", /json/);
  });
});
