const supertest = require('supertest');
const app = require('../../app');

const api = supertest(app);
const db = require('../../models');
const helper = require('../test_helper');

const Option = db.options;
const PlainOption = db.plainOptions;

beforeEach(async () => {
  await db.sequelize.sync({ force: true });

  await PlainOption.bulkCreate([{}, {}]);
  await Option.bulkCreate(helper.initialOptions);
  await Option.bulkCreate(helper.initialEnglishOptions);
});

describe('Getting options from database', () => {
  test('options are returned as json', async () => {
    await api
      .get('/api/options/fi')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api
      .get('/api/options/en')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all options are returned', async () => {
    const response = await api.get('/api/options/fi');
    expect(response.body).toHaveLength(helper.initialOptions.length);

    const engResponse = await api.get('/api/options/en');
    expect(engResponse.body).toHaveLength(helper.initialEnglishOptions.length);
  });

  test('a specific option is within the returned options', async () => {
    const response = await api.get('/api/options/fi');
    const names = response.body.map((r) => r.name);
    expect(names).toContain('TestiVaihtoehto2');

    const engResponse = await api.get('/api/options/en');
    const engNames = engResponse.body.map((r) => r.name);
    expect(engNames).toContain('TestOption1');
  });

  /*
  test('if a differential does not have a translation, default is returned', async () => {
    const response = await api.get('/api/differentials/en');
    const names = response.body.map((r) => r.name);
    expect(names).toContain('TestiDiffi2');
  });
  */
});

describe('Adding an option to database', () => {
  test('a valid option can be added', async () => {
    const newOption = {
      name: 'Uusi vaihtoehto',
    };

    await api
      .post('/api/options/fi')
      .send(newOption)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/options/fi');

    const names = response.body.map((r) => r.name);

    expect(response.body).toHaveLength(helper.initialOptions.length + 1);
    expect(names).toContain('Uusi vaihtoehto');
  });

  test('same option in different language can be added', async () => {
    const newOption = {
      id: 2,
      name: 'New option',
    };

    await api
      .post('/api/options/en')
      .send(newOption)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/options/en');
    const finResponse = await api.get('/api/options/fi');

    const names = response.body.map((r) => r.name);

    expect(response.body).toHaveLength(helper.initialEnglishOptions.length + 1);
    expect(finResponse.body).toHaveLength(helper.initialOptions.length);
    expect(names).toContain('New option');
  });

  test('option without name is not added', async () => {
    const newOption = {};
    await api
      .post('/api/options/fi')
      .send(newOption)
      .expect(500);

    const response = await api.get('/api/options/fi');

    expect(response.body).toHaveLength(helper.initialOptions.length);
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
