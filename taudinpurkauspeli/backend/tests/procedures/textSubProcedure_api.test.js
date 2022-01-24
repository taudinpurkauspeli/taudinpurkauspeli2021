const supertest = require('supertest');
const app = require('../../app');

const api = supertest(app);
const db = require('../../models');
const helper = require('../test_helper');

const TSP = db.textSubProcedures;

describe('text_sub_procedures', () => {
  beforeEach(async () => {
    // deletes the content from the table 'cases'
    await db.sequelize.sync({ force: true });
    // inserts test cases in the table 'cases'
    await db.initialCases.bulkCreate(helper.initials);
    await db.cases.bulkCreate(helper.initialCases);
    await db.procedures.bulkCreate(helper.initialProcedures);
    await db.proceduresUnderCases.bulkCreate(helper.initialProceduresUnderCases);
    await db.subProcedures.bulkCreate(helper.initialSubProcedures);
    await TSP.bulkCreate(helper.initialTextSubProcedures);
  });

  test('all text sub procedures are returned', async () => {
    const response = await api.get('/api/textsubprocedures');

    expect(response.body).toHaveLength(helper.initialTextSubProcedures.length);
  });

  test('a valid text sub procedure can be added', async () => {
    const newTextSubProcedure = {
      subProcedureId: 2,
      title: 'TestTitle2',
      text: 'TestText2',
      language: 'fin',
    };

    await api
      .post('/api/textsubprocedures')
      .send(newTextSubProcedure)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/textsubprocedures');

    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(helper.initialTextSubProcedures.length + 1);
    expect(titles).toContain('TestTitle2');
  });

  test('text sub procedure without title is not added', async () => {
    const newTextSubProcedure = {
      subProcedureId: 1,
      title: null,
      text: 'TestText2',
      language: 'fin',
    };
    await api
      .post('/api/procedures')
      .send(newTextSubProcedure)
      .expect(400);

    const response = await api.get('/api/textsubprocedures');

    expect(response.body).toHaveLength(helper.initialTextSubProcedures.length);
  });

  test('title can be changed', async () => {
    await api
      .put('/api/textsubprocedures/1')
      .send({
        subProceduresId: 1,
        title: 'this is a coconut',
        text: 'TestText2',
        language: 'fin',
      });
    const responseCheck = await api.get('/api/textsubprocedures');
    const contentsCheck = responseCheck.body[0].title;
    expect(contentsCheck).toEqual('this is a coconut');
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
