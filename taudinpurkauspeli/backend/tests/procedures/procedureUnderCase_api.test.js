const supertest = require('supertest');
const app = require('../../app');

const api = supertest(app);
const db = require('../../models');
const helper = require('../test_helper');

describe('procedures', () => {
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
    await db.plainCases.bulkCreate(helper.plainCases);
    await db.plainProcedures.bulkCreate([{}, {}]);
    await db.procedures.bulkCreate(helper.initialProcedures);
    await db.proceduresUnderCases.bulkCreate(helper.initialProceduresUnderCases);
  });

  test('all procedures under cases are returned', async () => {
    const response = await api.get('/api/proceduresUnderCases/1/fi');

    expect(response.body).toHaveLength(helper.initialProceduresUnderCases.length);
  });

  test('a valid procedure under case can be added ', async () => {
    const newProcedureUnderCase = {
      caseId: 2,
      procedureId: 1,
      priority: 3,
    };

    await api
      .post('/api/proceduresUnderCases/fi')
      .send(newProcedureUnderCase)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/proceduresUnderCases/2/fi');

    const priorities = response.body.map((r) => r.priority);

    expect(response.body).toHaveLength(1);
    expect(priorities).toContain(3);
  });

  test('priority can be changed', async () => {
    await api
      .put('/api/proceduresUnderCases/1')
      .send({
        caseId: 1,
        procedureId: 1,
        priority: 55,
      });
    const responseCheck = await api.get('/api/proceduresUnderCases/1/fi');
    const priorities = responseCheck.body.map((r) => r.priority);

    expect(priorities).toContain(55);
  });

  test('procedure can be deleted from case', async () => {
    await api
      .del('/api/proceduresUnderCases/1')
      .expect(204);

    const returnedProcedures = await api.get('/api/proceduresUnderCases/1/fi');
    expect(returnedProcedures.body).toHaveLength(helper.initialProceduresUnderCases.length - 1);
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
