const supertest = require('supertest');
const app = require('../../app');

const api = supertest(app);
const db = require('../../models');
const helper = require('../test_helper');

const Procedure = db.procedures;
const PlainProcedure = db.plainProcedures;

beforeEach(async () => {
  // deletes the content from the table 'procedures'
  await db.sequelize.sync({ force: true });
  // inserts test cases in the table 'procedures'
  await PlainProcedure.bulkCreate([{}, {}]);
  await Procedure.bulkCreate(helper.initialProcedures);
  await Procedure.bulkCreate(helper.initialEnglishProcedures);
});

describe('Getting procedures from database', () => {
  test('procedures are returned as json', async () => {
    await api
      .get('/api/procedures/fin')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api
      .get('/api/procedures/eng')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all procedures are returned', async () => {
    const response = await api.get('/api/procedures/fin');
    expect(response.body).toHaveLength(helper.initialProcedures.length);

    const engResponse = await api.get('/api/procedures/eng');
    expect(engResponse.body).toHaveLength(helper.initialEnglishProcedures.length);
  });

  test('a specific differential is within the returned procedures', async () => {
    const response = await api.get('/api/procedures/fin');
    const names = response.body.map((r) => r.name);
    expect(names).toContain('TestiToimenpide2');

    const engResponse = await api.get('/api/procedures/eng');
    const engNames = engResponse.body.map((r) => r.name);
    expect(engNames).toContain('TestProcedure1');
  });
});

describe('Adding a procedure to database', () => {
  test('a valid procedure can be added', async () => {
    const newProcedure = {
      name: 'TestProcedure3',
    };

    await api
      .post('/api/procedures/fin')
      .send(newProcedure)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/procedures/fin');

    const names = response.body.map((r) => r.name);

    expect(response.body).toHaveLength(helper.initialProcedures.length + 1);
    expect(names).toContain('TestProcedure3');
  });

  test('same procedure in different language can be added', async () => {
    const newProcedure = {
      id: 2,
      name: 'English name',
    };

    await api
      .post('/api/procedures/eng')
      .send(newProcedure)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/procedures/eng');

    const names = response.body.map((r) => r.name);

    expect(response.body).toHaveLength(helper.initialEnglishProcedures.length + 1);
    expect(names).toContain('English name');
  });

  test('procedure without title is not added', async () => {
    const newProcedure = {
      name: null,
    };
    await api
      .post('/api/procedures/fin')
      .send(newProcedure)
      .expect(400);

    const response = await api.get('/api/procedures/fin');

    expect(response.body).toHaveLength(helper.initialProcedures.length);
  });

  test('title can be changed', async () => {
    await api
      .put('/api/procedures/1/fin')
      .send({
        name: 'TestProcedure4',
      });

    const response = await api.get('/api/procedures/fin');
    const names = response.body.map((r) => r.name);

    expect(names).toContain('TestProcedure4');
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
