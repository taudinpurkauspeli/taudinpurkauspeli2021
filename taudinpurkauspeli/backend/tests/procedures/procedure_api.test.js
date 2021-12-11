const supertest = require('supertest');
const app = require('../../app');

const api = supertest(app);
const db = require('../../models');
const helper = require('../test_helper');

const Procedure = db.procedures;
const Case = db.cases;
const ProcedureUnderCase = db.proceduresUnderCases;

describe('procedures', () => {
  beforeEach(async () => {
    // deletes the content from the table 'cases'
    await db.sequelize.sync({ force: true });
    // inserts test cases in the table 'cases'
    await Procedure.bulkCreate(helper.initialProcedures);
    await Case.bulkCreate(helper.initialCases);
    await ProcedureUnderCase.bulkCreate(helper.initialProceduresUnderCases);
  });

  test('all procedures are returned', async () => {
    const response = await api.get('/api/procedures');

    expect(response.body).toHaveLength(helper.initialProcedures.length);
  });

  test('a valid case can be added ', async () => {
    const newProcedure = {
      title: 'TestProcedure3',
    };

    await api
      .post('/api/procedures')
      .send(newProcedure)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/procedures');

    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(helper.initialProcedures.length + 1);
    expect(titles).toContain('TestProcedure3');
  });

  test('procedure without title is not added', async () => {
    const newProcedure = {
      title: null,
    };
    await api
      .post('/api/procedures')
      .send(newProcedure)
      .expect(400);

    const response = await api.get('/api/procedures');

    expect(response.body).toHaveLength(helper.initialProcedures.length);
  });

  test('title can be changed', async () => {
    await api
      .put('/api/procedures/1')
      .send({
        title: 'TestProcedure4',
      });
    const responseCheck = await api.get('/api/procedures/1');
    const contentsCheck = responseCheck.body[0].procedures[0].title;
    expect(contentsCheck).toEqual('TestProcedure4');
  });
});

afterAll(async () => {
  await db.sequelize.close();
});