const request = require("supertest");

const app = require("../src/app");

describe("GET /api/v1/users", () => {
  const usersProperties = ["id", "firstname", "lastname", "email"];

  it("should be an array", async () => {
    const res = await request(app)
      .get("/api/v1/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach((user) => {
      expect(user).toHaveProperty(usersProperties[0]);
      expect(user).toHaveProperty(usersProperties[1]);
      expect(user).toHaveProperty(usersProperties[2]);
      expect(user).toHaveProperty(usersProperties[3]);
    });
  });
});
