const supertest = require('supertest');
const app = require('../../app');

const api = supertest(app);
const db = require('../../models');
const helper = require('../test_helper');

const DifferentialGroup = db.differentialGroups;
const PlainDifferentialGroup = db.plainDifferentialGroups;

beforeEach(async () => {
  await db.sequelize.sync({ force: true });
  await PlainDifferentialGroup.bulkCreate([{}, {}]);
  await DifferentialGroup.bulkCreate(helper.initialDifferentialGroups);
  await DifferentialGroup.bulkCreate(helper.initialEnglishDifferentialGroups);
});

describe('Getting differentialgroups from database', () => {
  test('differentialgroups are returned as json', async () => {
    await api
      .get('/api/differentialGroups/fi')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api
      .get('/api/differentialGroups/en')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all differentialgroups are returned', async () => {
    const response = await api.get('/api/differentialGroups/fi');
    expect(response.body).toHaveLength(helper.initialDifferentialGroups.length);

    const engResponse = await api.get('/api/differentialGroups/en');
    expect(engResponse.body).toHaveLength(helper.initialEnglishDifferentialGroups.length);
  });

  test('a specific differentialgroup is within the returned differentialgroups', async () => {
    const response = await api.get('/api/differentialGroups/fi');
    const names = response.body.map((r) => r.name);
    expect(names).toContain('TestiDiffiRyhmä2');

    const engResponse = await api.get('/api/differentialGroups/en');
    const engNames = engResponse.body.map((r) => r.name);
    expect(engNames).toContain('TestDifferentialGroup1');
  });
});

describe('Adding a differentialgroup to database', () => {
  test('a valid differentialgroup can be added', async () => {
    const newDifferentialGroup = {
      name: 'newDifferentialGroup',
    };

    await api
      .post('/api/differentialGroups/fi')
      .send(newDifferentialGroup)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/differentialGroups/fi');

    const names = response.body.map((r) => r.name);

    expect(response.body).toHaveLength(helper.initialDifferentialGroups.length + 1);
    expect(names).toContain('newDifferentialGroup');
  });

  test('same differentialgroup in different language can be added', async () => {
    const newDifferentialGroup = {
      id: 2,
      name: 'English diffgroup',
    };

    await api
      .post('/api/differentialGroups/en')
      .send(newDifferentialGroup)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/differentialGroups/en');
    const finResponse = await api.get('/api/differentialGroups/fi');

    const names = response.body.map((r) => r.name);

    expect(response.body).toHaveLength(helper.initialEnglishDifferentialGroups.length + 1);
    expect(finResponse.body).toHaveLength(helper.initialDifferentialGroups.length);
    expect(names).toContain('English diffgroup');
  });

  test('differentialgroup without name is not added', async () => {
    const newDifferentialGroup = {};
    await api
      .post('/api/differentialGroups/fi')
      .send(newDifferentialGroup)
      .expect(500);

    const response = await api.get('/api/differentialGroups/fi');

    expect(response.body).toHaveLength(helper.initialDifferentialGroups.length);
  });

  test('differentialgroup that is already in database is not added', async () => {
    const newDifferentialGroup = {
      name: 'TestiDiffiRyhmä1',
    };

    await api
      .post('/api/differentialGroups/fi')
      .send(newDifferentialGroup)
      .expect(500);

    const response = await api.get('/api/differentialGroups/fi');
    expect(response.body).toHaveLength(helper.initialDifferentialGroups.length);
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
