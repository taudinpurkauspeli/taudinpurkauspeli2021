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
  await db.subProcedureTypes.bulkCreate(helper.subProcedureTypes);
  await db.plainSubProcedures.bulkCreate(helper.plainSubProcedures);
  await db.subProcedures.bulkCreate(helper.initialSubProcedures);
  await db.plainTextSubProcedures.bulkCreate(helper.plainTextSubProcedures);
  await db.textSubProcedures.bulkCreate(helper.initialTextSubProcedures);
});

describe('Getting subprocedures from database', () => {
  test('subprocedures are returned as json', async () => {
    await api
      .get('/api/subProcedures/1/fi')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api
      .get('/api/subProcedures/1/en')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all subprocedures are returned', async () => {
    const response = await api.get('/api/subProcedures/1/fi');
    expect(response.body).toHaveLength(helper.initialSubProcedures.length);
  });
});

describe('Adding a subprocedure to database', () => {
  test('a valid text subprocedure can be added', async () => {
    const newSubProcedure = {
      type: 'TEXT',
      priority: 1,
      procedureCaseId: 1,
      title: 'newTitle',
      text: 'TestText2',
    };

    await api
      .post('/api/subProcedures/fi')
      .send(newSubProcedure)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/subProcedures/1/fi');
    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(helper.initialSubProcedures.length + 1);
    expect(titles).toContain('newTitle');
  });

  test('textsubprocedure without title is not added', async () => {
    const newTextSubProcedure = {
      type: 'TEXT',
      priority: 1,
      procedureCaseId: 1,
      text: 'TestText2',
    };
    await api
      .post('/api/subProcedures/fi')
      .send(newTextSubProcedure)
      .expect(400);

    const response = await api.get('/api/subProcedures/1/fi');

    expect(response.body).toHaveLength(helper.initialTextSubProcedures.length);
  });

  test('subprocedure without priority is not added', async () => {
    const newSubProcedure = {
      type: 'TEXT',
      procedureCaseId: 1,
    };
    await api
      .post('/api/subProcedures/fi')
      .send(newSubProcedure)
      .expect(400);

    const response = await api.get('/api/subProcedures/1/fi');

    expect(response.body).toHaveLength(helper.initialSubProcedures.length);
  });

  test('procedure without type is not added', async () => {
    const newSubProcedure = {
      priority: 1,
      procedureCaseId: 1,
    };
    await api
      .post('/api/subProcedures/fi')
      .send(newSubProcedure)
      .expect(500);

    const response = await api.get('/api/subProcedures/1/fi');

    expect(response.body).toHaveLength(helper.initialSubProcedures.length);
  });
});

describe('Updating a subprocedure', () => {
  test('priority can be changed', async () => {
    await api
      .put('/api/subProcedures/1/fi')
      .send({
        priority: '42',
        type: 'TEXT',
      });

    const response = await api.get('/api/subProcedures/1/fi');

    const priorities = response.body.map((r) => r.priority);
    expect(priorities).toContain(42);
  });

  test('title can be changed', async () => {
    await api
      .put('/api/subProcedures/1/fi')
      .send({
        type: 'TEXT',
        priority: 1,
        procedureCaseId: 1,
        title: 'this is a coconut',
        text: 'TestText1',
      });

    const response = await api.get('/api/subProcedures/1/fi');

    const titles = response.body.map((r) => r.title);
    expect(titles).toContain('this is a coconut');
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
