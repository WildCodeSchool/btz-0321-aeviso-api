// const request = require("supertest");

// const app = require("../src/app");

// describe("Records CRUD", () => {
//   const recordsProperties = [
//     "id",
//     "user_id",
//     "project_id",
//     "step_id",
//     "time_slot",
//   ];

//   it("should respond with an array of records ", async () => {
//     const res = await request(app)
//       .get("/api/v1/records")
//       .set("Accept", "application.json")
//       .expect("Content-Type", /json/)
//       .expect(200);

//     expect(Array.isArray(res.body)).toBe(true);

//     res.body.forEach((record) => {
//       recordsProperties.forEach((property) =>
//         expect(record).toHaveProperty(property)
//       );
//     });
//   });

//   it("should respond with one record ", async () => {
//     const res = await request(app)
//       .get("/api/v1/records/1")
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200);

//     recordsProperties.forEach((property) => {
//       expect(res.body).toHaveProperty(property);
//     });
//   });

//   it("should create one record", async () => {
//     const payload = {
//       user_id: null,
//       project_id: null,
//       step_id: null,
//       time_slot: "matinée",
//     };
//     const res = await request(app)
//       .post("/api/v1/records")
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .send(payload)
//       .expect(201);

//     recordsProperties.forEach((property) => {
//       expect(res.body).toHaveProperty(property);
//     });
//   });

//   it("should update one record and respond with it", async () => {
//     const payload = {
//       user_id: "12jj",
//       project_id: "p.12mars",
//       step_id: "essai sur la dernière partie",
//       time_slot: "matinée",
//     };
//     const res = await request(app)
//       .put("/api/v1/records/1")
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .send(payload)
//       .expect(200);

//     recordsProperties.forEach((property) => {
//       expect(res.body).toHaveProperty(property);
//     });
//   });

//   it("should delete one record", async () => {
//     await request(app).delete("/api/v1/records/2").expect(204);
//   });
// });
