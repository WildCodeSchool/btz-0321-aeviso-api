const request = require("supertest");
const prismaClient = require("../prismaClient");
const app = require("../src/app");

const recordsProperties = [
  "id",
  "date",
  "timeslot",
  "comment",
  "userId",
  "projectId",
  "createdAt",
  "updatedAt",
];

const randomRecord = async (property) => {
  const records = await prismaClient.record.findMany();
  const record = records[Math.floor(Math.random() * records.length)];

  if (property) return record[property];

  return record;
};

const isUUID = (string) => {
  expect(string).toMatch(
    /^[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}$/
  );
};

const date = new Date();

describe("Records CRUD", () => {
  it("should respond with an array of records ", async () => {
    const res = await request(app)
      .get("/api/v1/records")
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach((record) => {
      recordsProperties.forEach((property) =>
        expect(record).toHaveProperty(property)
      );

      isUUID(record.id);
    });
  });

  it("should respond with one record ", async () => {
    const res = await request(app)
      .get(`/api/v1/records/${await randomRecord("id")}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    recordsProperties.forEach((property) => {
      expect(res.body).toHaveProperty(property);
    });

    isUUID(res.body.id);
  });

  it("should create one record", async () => {
    const user = await prismaClient.user.findFirst();
    const project = await prismaClient.project.findFirst();

    isUUID(user.id);
    isUUID(project.id);

    const payload = {
      date: date.toISOString(),
      timeslot: "MORNING",
      comment: "Lorem Ipsum dolor sit eiusmod tempor inc",
      userId: user.id,
      projectId: project.id,
    };

    const res = await request(app)
      .post("/api/v1/records")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send(payload)
      .expect(201);

    recordsProperties.forEach((property) => {
      expect(res.body).toHaveProperty(property);
    });

    isUUID(res.body.id);
  });

  it("should update one record and respond with it", async () => {
    const payload = {
      timeslot: "AFTERNOON",
    };

    const res = await request(app)
      .put(`/api/v1/records/${await randomRecord("id")}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send(payload)
      .expect(200);

    recordsProperties.forEach((property) => {
      expect(res.body).toHaveProperty(property);
    });

    isUUID(res.body.id);
  });

  it("should delete one record", async () => {
    await request(app)
      .delete(`/api/v1/records/${await randomRecord("id")}`)
      .expect(204);
  });
});

afterAll(() => prismaClient.$disconnect());
