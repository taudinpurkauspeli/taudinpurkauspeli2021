const supertest = require('supertest');
const app = require('../../../app');

const api = supertest(app);
const db = require('../../../models');
const helper = require('../../test_helper');

beforeEach(async () => {
  await db.sequelize.sync({ force: true });

  await db.plainProcedures.bulkCreate([{}, {}]);
  await db.plainCases.bulkCreate(helper.plainCases);
  await db.proceduresUnderCases.bulkCreate(helper.initialProceduresUnderCases);
  await db.subProcedureTypes.bulkCreate(helper.subProcedureTypes);
  await db.plainOptionGroups.bulkCreate([{}, {}]);
  await db.plainSubProcedures.bulkCreate(helper.plainSubProcedures);
  await db.optionGroupsUnderSubProcedures.bulkCreate(helper.initialOptionGroupsUnderSubProcedures);
  await db.plainDescriptions.bulkCreate([{}, {}]);
  await db.descriptions.bulkCreate(helper.initialDescriptions);
  await db.plainOptions.bulkCreate([{}, {}]);
  await db.options.bulkCreate(helper.initialOptions);
  await db.optionsUnderSubProcedures.bulkCreate(helper.initialOptionsUnderSubProcedures);
});

describe('Getting subprocedure-option-pairs from database', () => {
  test('subprocedure-option-pairs are returned as json', async () => {
    await api
      .get('/api/optionsUnderSubProcedures/2/INTERVIEW/fi')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all entries are returned', async () => {
    const response = await api.get('/api/optionsUnderSubProcedures/1/INTERVIEW/fi');
    const names = response.body.map((r) => r.name);
    const descriptions = response.body.map((r) => r.description);

    expect(response.body).toHaveLength(3);
    expect(names).toContain('TestiVaihtoehto1');
    expect(descriptions).toContain('TestiKuvaus2');
  });
});

describe('Adding subprocedure-option-pairs to database', () => {
  test('Subprocedure-option-pairs can be added', async () => {
    const newOptionUnderCase = {
      optionGroupSubProcedureId: 2,
      optionId: 2,
      description: 'Uusi kuvaus',
      isRequired: 1,
    };

    await api
      .post('/api/optionsUnderSubProcedures/fi')
      .send(newOptionUnderCase)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/optionsUnderSubProcedures/1/INTERVIEW/fi');
    const descriptions = response.body.map((r) => r.description);

    expect(response.body).toHaveLength(4);
    expect(descriptions).toContain('Uusi kuvaus');
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
