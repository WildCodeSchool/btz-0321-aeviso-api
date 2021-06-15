const request = require("supertest");
const app = require("../src/app");

const usersProperties = [
  "id",
  "firstName",
  "lastName",
  "email",
  "password",
  "role",
  "weeklyBasis",
  "createdAt",
  "updatedAt",
  "companyId",
  "jobId",
];

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
  jobId: "e99f8391-1abc-4da6-98c4-6d1273c82c09",
  companyId: "500c8dbd-ee35-44dc-92c9-a3598b9f9d63",
};

describe("USERS RESSOURCES", () => {
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/v1/users")
      .send(userPayload)
      .expect(201)
      .expect("Content-Type", /json/);

    firstUserId = res.body.id;

    expect(res.body).toHaveProperty(usersProperties[0]);
    expect(res.body).toHaveProperty(usersProperties[1], userPayload.firstName);
    expect(res.body).toHaveProperty(usersProperties[2], userPayload.lastName);
    expect(res.body).toHaveProperty(usersProperties[3], userPayload.email);
    expect(res.body).toHaveProperty(usersProperties[4], userPayload.password);
    expect(res.body).toHaveProperty(usersProperties[5], userPayload.role);
    expect(res.body).toHaveProperty(
      usersProperties[6],
      userPayload.weeklyBasis
    );
    expect(res.body).toHaveProperty(usersProperties[7]);
    expect(res.body).toHaveProperty(usersProperties[8]);
    expect(res.body).toHaveProperty(usersProperties[9], userPayload.companyId);
    expect(res.body).toHaveProperty(usersProperties[10], userPayload.jobId);
  });

  it("should create a new user without company, default role USER", async () => {
    const payload = {
      firstName: "Sylvie",
      lastName: "Destenave",
      email: "simpletest@test.fr",
      jobId,
    };
    const res = await request(app)
      .post("/api/v1/users")
      .send(payload)
      .expect(201)
      .expect("Content-Type", /json/);

    secondUserId = res.body.id;

    expect(res.body).toHaveProperty(usersProperties[0]);
    expect(res.body).toHaveProperty(usersProperties[1], payload.firstName);
    expect(res.body).toHaveProperty(usersProperties[2], payload.lastName);
    expect(res.body).toHaveProperty(usersProperties[3], payload.email);
    expect(res.body).toHaveProperty(usersProperties[4], null);
    expect(res.body).toHaveProperty(usersProperties[5], "USER");
    expect(res.body).toHaveProperty(usersProperties[6], "h35");
    expect(res.body).toHaveProperty(usersProperties[7]);
    expect(res.body).toHaveProperty(usersProperties[8]);
    expect(res.body).toHaveProperty(usersProperties[9], null);
    expect(res.body).toHaveProperty(usersProperties[10], payload.jobId);
  });

  it("should respond with 404 status", async () => {
    const payload = {
      firstName: "Jean-Louis",
      lastName: "Laborde",
      email: "testeur@test.fr", // email created before : not unique
      jobId,
    };
    await request(app)
      .post("/api/v1/users")
      .send(payload)
      .expect(400)
      .expect("Content-Type", /json/);
  });

  it("should respond with 400 status", async () => {
    const payload = {
      firstName: "Jean-Louis",
      email: "testuser@test.fr",
      jobId,
    }; // Missing lastName field in body
    await request(app)
      .post("/api/v1/users")
      .send(payload)
      .expect(422)
      .expect("Content-Type", /json/);
  });

  it("should respond with 400 status", async () => {
    const payload = {
      lastName: "Dubois",
      email: "supertest@test.fr",
      jobId,
    }; // Missing firstName field in body
    await request(app)
      .post("/api/v1/users")
      .send(payload)
      .expect(422)
      .expect("Content-Type", /json/);
  });

  it("should respond with 400 status", async () => {
    const payload = {
      firstName: "Mylène",
      lastName: "Dubois",
      jobId,
    }; // Missing email field in body
    await request(app)
      .post("/api/v1/users")
      .send(payload)
      .expect(422)
      .expect("Content-Type", /json/);
  });

  it("should respond with 400 status", async () => {
    const payload = {
      firstName: "Mylène",
      lastName: "Dubois",
      email: "anothertest@test.fr",
    }; // Missing jobId field in body
    await request(app)
      .post("/api/v1/users")
      .send(payload)
      .expect(422)
      .expect("Content-Type", /json/);
  });

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
        expect(user).toHaveProperty(usersProperties[4]);
        expect(user).toHaveProperty(usersProperties[5]);
        expect(user).toHaveProperty(usersProperties[6]);
        expect(user).toHaveProperty(usersProperties[7]);
        expect(user).toHaveProperty(usersProperties[8]);
        expect(user).toHaveProperty(usersProperties[9]);
        expect(user).toHaveProperty(usersProperties[10]);
      });
    }
  });

  it("should respond 200 with one user", async () => {
    const res = await request(app)
      .get(`/api/v1/users/${firstUserId}`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).toHaveProperty(usersProperties[0]);
    expect(res.body).toHaveProperty(usersProperties[1], userPayload.firstName);
    expect(res.body).toHaveProperty(usersProperties[2], userPayload.lastName);
    expect(res.body).toHaveProperty(usersProperties[3], userPayload.email);
    expect(res.body).toHaveProperty(usersProperties[4], userPayload.password);
    expect(res.body).toHaveProperty(usersProperties[5], userPayload.role);
    expect(res.body).toHaveProperty(
      usersProperties[6],
      userPayload.weeklyBasis
    );
    expect(res.body).toHaveProperty(usersProperties[7]);
    expect(res.body).toHaveProperty(usersProperties[8]);
    expect(res.body).toHaveProperty(usersProperties[9], userPayload.companyId);
    expect(res.body).toHaveProperty(usersProperties[10], userPayload.jobId);
  });

  it("should respond 404", async () => {
    await request(app)
      .get("/api/v1/users/10")
      .expect(404)
      .expect("Content-Type", /json/);
  });

  it("should modify an user", async () => {
    const payload = {
      firstName: "Jean",
      lastName: "Lafond",
    };

    const res = await request(app)
      .put(`/api/v1/users/${firstUserId}`)
      .send(payload)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).toHaveProperty(usersProperties[0]);
    expect(res.body).toHaveProperty(usersProperties[1], payload.firstName);
    expect(res.body).toHaveProperty(usersProperties[2], payload.lastName);
    expect(res.body).toHaveProperty(usersProperties[3], userPayload.email);
    expect(res.body).toHaveProperty(usersProperties[4], userPayload.password);
    expect(res.body).toHaveProperty(usersProperties[5], userPayload.role);
    expect(res.body).toHaveProperty(
      usersProperties[6],
      userPayload.weeklyBasis
    );
    expect(res.body).toHaveProperty(usersProperties[7]);
    expect(res.body).toHaveProperty(usersProperties[8]);
    expect(res.body).toHaveProperty(usersProperties[9], userPayload.companyId);
    expect(res.body).toHaveProperty(usersProperties[10], userPayload.jobId);
  });

  it("should respond 404", async () => {
    const payload = {
      firstname: "Alice",
      lastname: "Delabarre",
      email: "oneadress@test.fr",
    };

    await request(app)
      .put("/api/v1/users/10")
      .send(payload)
      .expect(404)
      .expect("Content-Type", /json/);
  });

  it("should delete an user", async () => {
    await request(app).delete(`/api/v1/users/${firstUserId}`).expect(204);
  });

  it("should delete an user", async () => {
    await request(app).delete(`/api/v1/users/${secondUserId}`).expect(204);
  });

  it("should respond 404", async () => {
    await request(app)
      .put("/api/v1/users/10")
      .expect(404)
      .expect("Content-Type", /json/);
  });
});
