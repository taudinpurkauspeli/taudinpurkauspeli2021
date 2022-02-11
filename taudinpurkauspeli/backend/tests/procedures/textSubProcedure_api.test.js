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
    await db.plainCases.bulkCreate(helper.plainCases);
    await db.cases.bulkCreate(helper.initialCases);
    await db.plainProcedures.bulkCreate([{}, {}]);
    await db.subProcedureTypes.bulkCreate(helper.subProcedureTypes);
    await db.procedures.bulkCreate(helper.initialProcedures);
    await db.proceduresUnderCases.bulkCreate(helper.initialProceduresUnderCases);
    await db.subProcedures.bulkCreate(helper.initialSubProcedures);
    await db.plainTextSubProcedures.bulkCreate(helper.plainTextSubProcedures);
    await TSP.bulkCreate(helper.initialTextSubProcedures);
  });

  test('all text sub procedures are returned', async () => {
    const response = await api.get('/api/textSubProcedures/fi');

    expect(response.body).toHaveLength(helper.initialTextSubProcedures.length);
  });

  test('a valid text sub procedure can be added', async () => {
    const newTextSubProcedure = {
      subProcedureId: 2,
      title: 'TestTitle2',
      text: 'TestText2',
    };

    await api
      .post('/api/textSubProcedures/fi')
      .send(newTextSubProcedure)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/textSubProcedures/fi');

    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(helper.initialTextSubProcedures.length + 1);
    expect(titles).toContain('TestTitle2');
  });

  test('text sub procedure without title is not added', async () => {
    const newTextSubProcedure = {
      subProcedureId: 1,
      title: null,
      text: 'TestText2',
    };
    await api
      .post('/api/textSubProcedures/fi')
      .send(newTextSubProcedure)
      .expect(400);

    const response = await api.get('/api/textSubProcedures/fi');

    expect(response.body).toHaveLength(helper.initialTextSubProcedures.length);
  });

  test('title can be changed', async () => {
    await api
      .put('/api/textsubprocedures/1/fi')
      .send({
        title: 'this is a coconut',
        text: 'TestText2',
      });
    const responseCheck = await api.get('/api/textSubProcedures/fi');
    const contentsCheck = responseCheck.body[1].title;
    expect(contentsCheck).toEqual('this is a coconut');
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
