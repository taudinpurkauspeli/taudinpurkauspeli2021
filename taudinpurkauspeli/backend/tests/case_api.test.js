const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const db = require('../models');
const helper = require('./test_helper');

const Case = db.cases;
const InitialCase = db.initialCases;

beforeEach(async () => {
  // deletes the content from the table 'cases'
  await db.sequelize.sync({ force: true });
  // inserts test cases in the table 'cases'
  await InitialCase.bulkCreate(helper.initials);
  await Case.bulkCreate(helper.initialCases);
  await Case.bulkCreate(helper.initialEnglishCases);
});

describe('Getting cases from database', () => {
  test('cases are returned as json', async () => {
    await api
      .get('/api/cases/fin')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api
      .get('/api/cases/eng')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all cases are returned', async () => {
    const response = await api.get('/api/cases/fin');
    expect(response.body.data).toHaveLength(helper.initialCases.length);

    const engResponse = await api.get('/api/cases/eng');
    expect(engResponse.body.data).toHaveLength(helper.initialEnglishCases.length);
  });

  test('throws error when trying to get case with non-existent id', async () => {
    await api
      .get('/api/cases/5/fin')
      .expect(404);

    await api
      .get('/api/cases/5/eng')
      .expect(404);
  });

  test('a specific case is within the returned cases', async () => {
    const response = await api.get('/api/cases/fin');
    const titles = response.body.data.map((r) => r.title);

    expect(titles).toContain('TestiCase2');

    const engResponse = await api.get('/api/cases/eng');
    const engTitles = engResponse.body.data.map((r) => r.title);

    expect(engTitles).toContain('TestCase1');
  });

  test('if a case does not have a translation, default is returned', async () => {
    const response = await api.get('/api/cases/2/eng');

    const { title, hidden, anamnesis } = response.body;
    expect(title).toEqual('TestiCase2');
    expect(hidden).toEqual(true);
    expect(anamnesis).toEqual('Testianamneesi');
  });
});

describe('Adding a case to database', () => {
  test('a valid case can be added ', async () => {
    const newCase = {
      title: 'NewTitle1',
      hidden: false,
      anamnesis: 'NewAnamnesis1',
    };

    await api
      .post('/api/cases/fin')
      .send(newCase)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/cases/fin');

    const titles = response.body.data.map((r) => r.title);
    const hiddens = response.body.data.map((r) => r.hidden);
    const anamnesiss = response.body.data.map((r) => r.anamnesis);

    expect(response.body.data).toHaveLength(helper.initialCases.length + 1);
    expect(titles).toContain('NewTitle1');
    expect(hiddens).toContain(false);
    expect(anamnesiss).toContain('NewAnamnesis1');
  });

  test('same case in different language can be added', async () => {
    const newCase = {
      id: 2,
      title: 'English title',
      anamnesis: 'English anamnesis',
    };

    await api
      .post('/api/cases/eng')
      .send(newCase)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/cases/eng');

    const titles = response.body.data.map((r) => r.title);
    const hiddens = response.body.data.map((r) => r.hidden);
    const anamnesiss = response.body.data.map((r) => r.anamnesis);

    expect(response.body.data).toHaveLength(helper.initialEnglishCases.length + 1);
    expect(titles).toContain('English title');
    expect(hiddens).toContain(true);
    expect(anamnesiss).toContain('English anamnesis');
  });

  test('case without title is not added', async () => {
    const newCase = {
      hidden: true,
      anamnesis: 'NewAnamnesis',
    };
    await api
      .post('/api/cases/fin')
      .send(newCase)
      .expect(400);

    const response = await api.get('/api/cases/fin');

    expect(response.body.data).toHaveLength(helper.initialCases.length);
  });
});

describe('Updating a case in database', () => {
  test('hidden value can be changed', async () => {
    await api
      .put('/api/cases/1/fin')
      .send({
        title: 'TestiCase1',
        hidden: false,
        anamnesis: 'Testianamneesi',
      });
    const response = await api.get('/api/cases/1/fin');
    expect(response.body.hidden).toEqual(false);
  });

  test('title can be changed to another valid title', async () => {
    await api
      .put('/api/cases/1/fin')
      .send({
        title: 'updatedTestCase',
        hidden: true,
        anamnesis: 'Testianamneesi',
      });
    const response = await api.get('/api/cases/1/fin');
    expect(response.body.title).toEqual('updatedTestCase');
  });

  test('invalid title is not updated', async () => {
    await api
      .put('/api/cases/1/fin')
      .send({
        title: 't',
        hidden: true,
        anamnesis: 'Testianamneesi',
      })
      .expect(400);
    const response = await api.get('/api/cases/1/fin');
    expect(response.body.title).toEqual('TestiCase1');
  });
});

describe('Removing a case from database', () => {
  test('Case can be deleted', async () => {
    await api
      .delete('/api/cases/1')
      .expect(204);

    const response = await api.get('/api/cases/fin');
    expect(response.body.data).toHaveLength(helper.initialCases.length - 1);

    const engResponse = await api.get('/api/cases/eng');
    expect(engResponse.body.data).toHaveLength(helper.initialEnglishCases.length - 1);
  });

  test('Non-existent case cannot be deleted', async () => {
    await api
      .delete('/api/cases/5')
      .expect(404);
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
