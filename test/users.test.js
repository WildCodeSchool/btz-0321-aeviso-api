const request = require("supertest");
const app = require("../src/app");

const usersProperties = ["id", "firstname", "lastname", "email"];

let firstUserId;
let secondUserId;

const jobId = "e99f8391-1abc-4da6-98c4-6d1273c82c09"; // Change this value by existing id in your local db

const userPayload = {
  firstName: "Marc",
  lastName: "Dupond",
  email: "testeur@test.fr",
  password: "abcd",
  role: "ADMIN",
  weeklyBasis: "h39",
  jobId: "e99f8391-1abc-4da6-98c4-6d1273c82c09", // Replace this value with existing id in your local db
  companyId: "500c8dbd-ee35-44dc-92c9-a3598b9f9d63", // Replace this value with existing id in your local db
};

describe("USERS RESSOURCES", () => {
  it("should be an array", async () => {
    const res = await request(app)
      .get("/api/v1/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);

    if (res.body) {
      res.body.forEach((user) => {
        expect(user).toHaveProperty(usersProperties[0]);
        expect(user).toHaveProperty(usersProperties[1]);
        expect(user).toHaveProperty(usersProperties[2]);
        expect(user).toHaveProperty(usersProperties[3]);
      });
    }
  });

  it("should respond 200 with one user", async () => {
    const res = await request(app)
      .get("/api/v1/users/1")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).toHaveProperty(usersProperties[0]);
    expect(res.body).toHaveProperty(usersProperties[1]);
    expect(res.body).toHaveProperty(usersProperties[2]);
    expect(res.body).toHaveProperty(usersProperties[3]);
  });

  it("should respond 404", async () => {
    await request(app)
      .get("/api/v1/users/10")
      .expect(404)
      .expect("Content-Type", /json/);
  });

  it("should create a new users", async () => {
    const payload = {
      firstname: "Basile",
      lastname: "Vernouillet",
      email: "formateur@test.fr",
      role: "SUPER_ADMIN",
      profession: "",
      company_id: null,
    };

    const res = await request(app)
      .post("/api/v1/users")
      .send(payload)
      .expect(201)
      .expect("Content-Type", /json/);

    expect(res.body).toHaveProperty(usersProperties[0]);
    expect(res.body).toHaveProperty(usersProperties[1], payload.firstname);
    expect(res.body).toHaveProperty(usersProperties[2], payload.lastname);
    expect(res.body).toHaveProperty(usersProperties[3], payload.email);
  });

  // Add unique item check when db will be connected

  it("should modify an user", async () => {
    const payload = {
      firstname: "Matt",
    };

    const res = await request(app)
      .put("/api/v1/users/1")
      .send(payload)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).toHaveProperty(usersProperties[0]);
    expect(res.body).toHaveProperty(usersProperties[1], payload.firstname);
    expect(res.body).toHaveProperty(usersProperties[2]);
    expect(res.body).toHaveProperty(usersProperties[3]);
  });

  it("should respond 404", async () => {
    const payload = {
      firstname: "Basile",
      lastname: "Vernouillet",
      email: "formateur@test.fr",
    };

    await request(app)
      .put("/api/v1/users/10")
      .send(payload)
      .expect(404)
      .expect("Content-Type", /json/);
  });

  it("should delete an user", async () => {
    await request(app).delete("/api/v1/users/1").expect(204);
  });

  it("should respond 404", async () => {
    await request(app)
      .put("/api/v1/users/10")
      .expect(404)
      .expect("Content-Type", /json/);
  });
});
