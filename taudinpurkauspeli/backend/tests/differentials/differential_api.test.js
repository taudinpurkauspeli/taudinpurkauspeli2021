const supertest = require('supertest');
const app = require('../../app');

const api = supertest(app);
const db = require('../../models');
const helper = require('../test_helper');

const Differential = db.differentials;
const PlainDifferential = db.plainDifferentials;

beforeEach(async () => {
  // deletes the content from the table 'differentials'
  await db.sequelize.sync({ force: true });
  // inserts test differentials in the table 'differentials'
  await PlainDifferential.bulkCreate([{}, {}]);
  await Differential.bulkCreate(helper.initialDifferentials);
  await Differential.bulkCreate(helper.initialEnglishDifferentials);
});

describe('Getting differentials from database', () => {
  test('differentials are returned as json', async () => {
    await api
      .get('/api/differentials/fin')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api
      .get('/api/differentials/eng')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all differentials are returned', async () => {
    const response = await api.get('/api/differentials/fin');
    expect(response.body).toHaveLength(helper.initialDifferentials.length);

    const engResponse = await api.get('/api/differentials/eng');
    expect(engResponse.body).toHaveLength(helper.initialEnglishDifferentials.length);
  });

  test('a specific differential is within the returned differentials', async () => {
    const response = await api.get('/api/differentials/fin');
    const names = response.body.map((r) => r.name);
    expect(names).toContain('TestiDiffi2');

    const engResponse = await api.get('/api/differentials/eng');
    const engNames = engResponse.body.map((r) => r.name);
    expect(engNames).toContain('TestDisease1');
  });

  /*
  test('if a differential does not have a translation, default is returned', async () => {
    const response = await api.get('/api/differentials/eng');
    const names = response.body.map((r) => r.name);
    expect(names).toContain('TestiDiffi2');
  });
  */
});

describe('Adding a differential to database', () => {
  test('a valid differential can be added', async () => {
    const newDifferential = {
      name: 'NewTitle1',
    };

    await api
      .post('/api/differentials/fin')
      .send(newDifferential)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/differentials/fin');

    const names = response.body.map((r) => r.name);

    expect(response.body).toHaveLength(helper.initialDifferentials.length + 1);
    expect(names).toContain('NewTitle1');
  });

  test('same differential in different language can be added', async () => {
    const newDifferential = {
      id: 2,
      name: 'English name',
    };

    await api
      .post('/api/differentials/eng')
      .send(newDifferential)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/differentials/eng');
    const finResponse = await api.get('/api/differentials/fin');

    const names = response.body.map((r) => r.name);

    expect(response.body).toHaveLength(helper.initialEnglishDifferentials.length + 1);
    expect(finResponse.body).toHaveLength(helper.initialDifferentials.length);
    expect(names).toContain('English name');
  });

  test('differential without name is not added', async () => {
    const newDifferential = {};
    await api
      .post('/api/differentials/fin')
      .send(newDifferential)
      .expect(500);

    const response = await api.get('/api/differentials/fin');

    expect(response.body).toHaveLength(helper.initialDifferentials.length);
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
