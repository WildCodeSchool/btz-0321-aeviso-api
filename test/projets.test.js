const { Taxation } = require('.prisma/client');
const request = require('supertest');
const app = require('../src/app');

const projectProperties = ['id', 'name', 'description', 'code', 'companyId', 'taxation'];

describe('PROJECTS RESSOURCES', () => {
  it('should be a array', async () => {
    const res = await request(app).get('/api/v1/projects').set('Accept', 'applicaiton/json').expect('Content-Type', /json/).expect(200);

    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach((projet) => {
      expect(projet).toHaveProperty(projectProperties[0]);
      expect(projet).toHaveProperty(projectProperties[1]);
      expect(projet).toHaveProperty(projectProperties[2]);
      expect(projet).toHaveProperty(projectProperties[3]);
      expect(projet).toHaveProperty(projectProperties[4]);
      expect(projet).toHaveProperty(projectProperties[5]);
    });
  });

  it('should respond 200 with one project', async () => {
    const res = await request(app).get('/api/v1/projects/05245a98-287d-4a3b-91de-3555195d57f1').expect(200).expect('content-Type', /json/);

    expect(res.body).toHaveProperty(projectProperties[0]);
    expect(res.body).toHaveProperty(projectProperties[1]);
    expect(res.body).toHaveProperty(projectProperties[2]);
    expect(res.body).toHaveProperty(projectProperties[3]);
    expect(res.body).toHaveProperty(projectProperties[4]);
    expect(res.body).toHaveProperty(projectProperties[5]);
  });

  it('should respond 404', async () => {
    await request(app).get('/api/v1/projects/123').expect(404).expect('Content-Type', /json/);
  });

  it('should create a new project', async () => {
    const payload = {
      name: 'Jhonfoe',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium gravida placerat. In mattis hendrerit magna gravida vehicula. Duis iaculis elit a neque mattis laoreet. Proin enim nibh, luctus nec elementum vel, pulvinar at tellus. Vestibulum vel laoreet turpis, ut eleifend est. Pellentesque sit amet nisl sit amet odio ultrices rhoncus nec sed lacus.',
      code: 'kjhdlksjwhfkjwsdf',
      companyId: '0bd6496b-2e49-4884-a5e0-3f3cf2ecfc1a',
      taxation: 'CIR',
    };

    const res = await request(app).post('/api/v1/projects').send(payload).expect(201).expect('content-type', /json/);

    expect(res.body).toHaveProperty(projectProperties[0]);
    expect(res.body).toHaveProperty(projectProperties[1], payload.name);
    expect(res.body).toHaveProperty(projectProperties[2], payload.description);
    expect(res.body).toHaveProperty(projectProperties[3], payload.code);
    expect(res.body).toHaveProperty(projectProperties[4], payload.companyId);
    expect(res.body).toHaveProperty(projectProperties[5], payload.taxation);
  });

  it('should modify a project', async () => {
    const payload = {
      name: 'La rive des dragons',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      code: 'ceci est code',
      companyId: '0bd6496b-2e49-4884-a5e0-3f3cf2ecfc1a',
    };

    const res = await request(app).put('/api/v1/projects/2').send(payload).expect(200).expect('Content-Type', /json/);

    expect(res.body).toHaveProperty(projectProperties[0]);
    expect(res.body).toHaveProperty(projectProperties[1], payload.name);
    expect(res.body).toHaveProperty(projectProperties[2], payload.description);
    expect(res.body).toHaveProperty(projectProperties[3], payload.code);
    expect(res.body).toHaveProperty(projectProperties[4], payload.companyId);
    expect(res.body).toHaveProperty(projectProperties[5], payload.taxation);
  });

  it('should respond 404', async () => {
    await request(app).put('/api/v1/projects/0bd6496b-2e49-4884-a5e0').expect(404).expect('Content-Type', /json/);
  });

  it('should delete a project', async () => {
    await request(app).delete('/api/v1/projects/6691cd72-af37-4cfd-b762-79d80ea95add').expect(204);
  });
});
