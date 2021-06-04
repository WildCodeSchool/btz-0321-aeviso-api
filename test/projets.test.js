const request = require("supertest");
const app = require("../src/app");

const projectProperties = ["id", "name", "description", "organization_id" ];

describe("PROJECTS RESSOURCES", () => {
    it("should be a array", async () => {
        const res = await request(app)
        .get("/api/v1/projets")
        .set("Accept", "applicaiton/json")
        .expect("Content-Type", /json/)
        .expect(200)

        expect(Array.isArray(res.body)).toBe(true);
      
        res.body.forEach((projet) => {
            expect(projet).toHaveProperty(projectProperties[0])
            expect(projet).toHaveProperty(projectProperties[1])
            expect(projet).toHaveProperty(projectProperties[2])
            expect(projet).toHaveProperty(projectProperties[3])
        })
    })

    it("should respond 200 with one project", async () => {
        const res = await request(app)
        .get("/api/v1/projets/1")
        .expect(200)
        .expect("content-Type", /json/);

        expect(res.body).toHaveProperty(projectProperties[0])
        expect(res.body).toHaveProperty(projectProperties[1])
        expect(res.body).toHaveProperty(projectProperties[2])
        expect(res.body).toHaveProperty(projectProperties[3])
    })

    it("should respond 404", async () => {
        await request(app)
        .get("/api/v1/projets/10")
        .expect(404)
        .expect("Content-Type", /json/);
    });

    it("should create a new project", async () => {
        const payload = {
            name: "Nazaré",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium gravida placerat. In mattis hendrerit magna gravida vehicula. Duis iaculis elit a neque mattis laoreet. Proin enim nibh, luctus nec elementum vel, pulvinar at tellus. Vestibulum vel laoreet turpis, ut eleifend est. Pellentesque sit amet nisl sit amet odio ultrices rhoncus nec sed lacus.",
            organization_id: null   
    }

    const res = await request(app)
    .post("/api/v1/projets")
    .send(payload)
    .expect(201)
    .expect("content-type", /json/);


    expect(res.body).toHaveProperty(projectProperties[0])
    expect(res.body).toHaveProperty(projectProperties[1], payload.name)
    expect(res.body).toHaveProperty(projectProperties[2], payload.description)
    expect(res.body).toHaveProperty(projectProperties[3], payload.organization_id)
    })

    it("should modify a project", async () => {
        const payload = {   
        name: "Nazaré",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium gravida placerat. In mattis hendrerit magna gravida vehicula. Duis iaculis elit a neque mattis laoreet. Proin enim nibh, luctus nec elementum vel, pulvinar at tellus. Vestibulum vel laoreet turpis, ut eleifend est. Pellentesque sit amet nisl sit amet odio ultrices rhoncus nec sed lacus.",
        organization_id: null  
     }

     const res = await request(app)
        .put("/api/v1/projets/3")
        .send(payload)
        .expect(200)
        .expect("Content-Type", /json/);

        expect(res.body).toHaveProperty(projectProperties[0])
        expect(res.body).toHaveProperty(projectProperties[1], payload.name)
        expect(res.body).toHaveProperty(projectProperties[2], payload.description)
        expect(res.body).toHaveProperty(projectProperties[3], payload.organization_id)
    
    })

    it("should respond 404", async () => {
        await request(app)
        .put("/api/v1/projets/15")
        .expect(404)
        .expect("Content-Type", /json/);
    });

    it("should delete a project", async () => {
        await request(app)
        .delete("/api/v1/projets/3")
        .expect(204)
    })
})