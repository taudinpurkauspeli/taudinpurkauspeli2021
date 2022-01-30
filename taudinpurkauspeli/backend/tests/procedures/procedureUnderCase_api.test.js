const supertest = require('supertest');
const app = require('../../app');

const api = supertest(app);
const db = require('../../models');
const helper = require('../test_helper');

describe('procedures', () => {
  beforeEach(async () => {
    // deletes the content from the table 'procedures'
    await db.sequelize.sync({ force: true });
    // inserts test cases in the table 'procedures'
    await db.plainCases.bulkCreate(helper.plainCases);
    await db.cases.bulkCreate(helper.initialCases);
    await db.procedures.bulkCreate(helper.initialProcedures);
    await db.proceduresUnderCases.bulkCreate(helper.initialProceduresUnderCases);
  });

  test('all procedures under cases are returned', async () => {
    const response = await api.get('/api/proceduresUnderCases');

    expect(response.body).toHaveLength(helper.initialProceduresUnderCases.length);
  });

  test('a valid procedure under case can be added ', async () => {
    const newProcedureUnderCase = {
      caseId: 2,
      procedureId: 1,
      priority: 3,
    };

    await api
      .post('/api/proceduresUnderCases')
      .send(newProcedureUnderCase)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/proceduresUnderCases');

    const priorities = response.body.map((r) => r.priority);

    expect(response.body).toHaveLength(helper.initialProceduresUnderCases.length + 1);
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
    const responseCheck = await api.get('/api/proceduresUnderCases');
    const priorities = responseCheck.body.map((r) => r.priority);

    expect(priorities).toContain(55);
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
