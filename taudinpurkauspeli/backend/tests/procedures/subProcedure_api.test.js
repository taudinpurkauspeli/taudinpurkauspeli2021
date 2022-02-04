const supertest = require('supertest');
const app = require('../../app');

const api = supertest(app);
const db = require('../../models');
const helper = require('../test_helper');

beforeEach(async () => {
  // deletes the content from the table 'cases'
  await db.sequelize.sync({ force: true });
  // inserts test cases in the table 'cases'
  await db.plainCases.bulkCreate(helper.plainCases);
  await db.cases.bulkCreate(helper.initialCases);
  await db.plainProcedures.bulkCreate([{}, {}]);
  await db.procedures.bulkCreate(helper.initialProcedures);
  await db.proceduresUnderCases.bulkCreate(helper.initialProceduresUnderCases);
  await db.plainSubProcedures.bulkCreate(helper.plainSubProcedures);
  await db.subProcedures.bulkCreate(helper.initialSubProcedures);
});

describe('Getting subprocedures from database', () => {
  test('subprocedures are returned as json', async () => {
    await api
      .get('/api/subprocedures/1/fi')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api
      .get('/api/subprocedures/1/en')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all subprocedures are returned', async () => {
    const response = await api.get('/api/subprocedures/1/fi');
    expect(response.body).toHaveLength(helper.initialSubProcedures.length);

    const engResponse = await api.get('/api/subprocedures/1/en');
    expect(engResponse.body).toHaveLength(helper.initialEnglishSubProcedures.length);
  });
});

describe('Adding a subprocedure to database', () => {
  test('a valid text subprocedure can be added', async () => {
    const newSubProcedure = {
      type: 'TEXT',
    };

    await api
      .post('/api/subprocedures/fi')
      .send(newSubProcedure)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/subprocedures/fi');

    expect(response.body).toHaveLength(helper.initialSubProcedures.length + 1);
  });

  test('same subprocedure in different language can be added', async () => {
    const newSubProcedure = {
      id: 2,
      type: 'TEXT',
    };

    await api
      .post('/api/subprocedures/en')
      .send(newSubProcedure)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/subprocedures/en');

    expect(response.body).toHaveLength(helper.initialEnglishSubProcedures.length + 1);
  });

  test('subprocedure without priority is not added', async () => {
    const newSubProcedure = {
      type: 'TEXT',
    };
    await api
      .post('/api/subprocedures/fi')
      .send(newSubProcedure)
      .expect(400);

    const response = await api.get('/api/subprocedures/fi');

    expect(response.body).toHaveLength(helper.initialSubProcedures.length);
  });

  test('procedure without type is not added', async () => {
    const newSubProcedure = {
      priority: 1,
    };
    await api
      .post('/api/subprocedures/fi')
      .send(newSubProcedure)
      .expect(400);

    const response = await api.get('/api/subprocedures/fi');

    expect(response.body).toHaveLength(helper.initialSubProcedures.length);
  });
});

describe('Updating a subprocedure', () => {
  test('priority can be changed', async () => {
    await api
      .put('/api/subprocedures/1/fi')
      .send({
        priority: '42',
        type: 'TEXT',
      });

    const response = await api.get('/api/subprocedures/1/fi');
    expect(response.body[0].subProcedures[0].priority).toEqual(42);
  });

  test('type can be changed', async () => {
    await api
      .put('/api/subprocedures/1/fi')
      .send({
        priority: 1,
        type: 'NOTTEXT',
      });
    const response = await api.get('/api/subprocedures/1/fi');
    expect(response.body[0].subProcedures[0].type).toEqual('NOTTEXT');
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
