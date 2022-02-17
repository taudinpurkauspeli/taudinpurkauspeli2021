const supertest = require('supertest');
const app = require('../../app');

const api = supertest(app);
const db = require('../../models');
const helper = require('../test_helper');

const OptionGroup = db.optionGroups;
const PlainOptionGroup = db.plainOptionGroups;

beforeEach(async () => {
  await db.sequelize.sync({ force: true });
  await PlainOptionGroup.bulkCreate([{}, {}]);
  await OptionGroup.bulkCreate(helper.initialOptionGroups);
  await OptionGroup.bulkCreate(helper.initialEnglishOptionGroups);
});

describe('Getting optiongroups from database', () => {
  test('optiongroups are returned as json', async () => {
    await api
      .get('/api/optionGroups/fi')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api
      .get('/api/optionGroups/en')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all optiongroups are returned', async () => {
    const response = await api.get('/api/optionGroups/fi');
    expect(response.body).toHaveLength(helper.initialOptionGroups.length);

    const engResponse = await api.get('/api/optionGroups/en');
    expect(engResponse.body).toHaveLength(helper.initialEnglishOptionGroups.length);
  });

  test('a specific optiongroup is within the returned optiongroups', async () => {
    const response = await api.get('/api/optionGroups/fi');
    const names = response.body.map((r) => r.name);
    expect(names).toContain('TestiVaihtoehtoRyhmä2');

    const engResponse = await api.get('/api/optionGroups/en');
    const engNames = engResponse.body.map((r) => r.name);
    expect(engNames).toContain('TestOptionGroup1');
  });
});

describe('Adding an optiongroup to database', () => {
  test('a valid optiongroup can be added', async () => {
    const newOptionGroup = {
      name: 'Uusi vaihtoehtoryhmä',
    };

    await api
      .post('/api/optionGroups/fi')
      .send(newOptionGroup)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/optionGroups/fi');

    const names = response.body.map((r) => r.name);

    expect(response.body).toHaveLength(helper.initialOptionGroups.length + 1);
    expect(names).toContain('Uusi vaihtoehtoryhmä');
  });

  test('same optiongroup in different language can be added', async () => {
    const newOptionGroup = {
      id: 2,
      name: 'English optiongroup',
    };

    await api
      .post('/api/optionGroups/en')
      .send(newOptionGroup)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/optionGroups/en');
    const finResponse = await api.get('/api/optionGroups/fi');

    const names = response.body.map((r) => r.name);

    expect(response.body).toHaveLength(helper.initialEnglishOptionGroups.length + 1);
    expect(finResponse.body).toHaveLength(helper.initialOptionGroups.length);
    expect(names).toContain('English optiongroup');
  });

  test('optiongroup without name is not added', async () => {
    const newOptionGroup = {};
    await api
      .post('/api/optionGroups/fi')
      .send(newOptionGroup)
      .expect(500);

    const response = await api.get('/api/optionGroups/fi');

    expect(response.body).toHaveLength(helper.initialOptionGroups.length);
  });

  test('optiongroup that is already in database is not added', async () => {
    const newOptionGroup = {
      name: 'TestiVaihtoehtoRyhmä1',
    };

    await api
      .post('/api/optionGroups/fi')
      .send(newOptionGroup)
      .expect(500);

    const response = await api.get('/api/optionGroups/fi');
    expect(response.body).toHaveLength(helper.initialOptionGroups.length);
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
