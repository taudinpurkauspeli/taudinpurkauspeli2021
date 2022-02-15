const supertest = require('supertest');
const app = require('../../app');

const api = supertest(app);
const db = require('../../models');
const helper = require('../test_helper');

beforeEach(async () => {
  await db.sequelize.sync({ force: true });

  await db.plainProcedures.bulkCreate([{}, {}]);
  await db.plainCases.bulkCreate(helper.plainCases);
  await db.proceduresUnderCases.bulkCreate(helper.initialProceduresUnderCases);
  await db.subProcedureTypes.bulkCreate(helper.subProcedureTypes);
  await db.plainOptionGroups.bulkCreate([{}, {}]);
  await db.optionGroups.bulkCreate(helper.initialOptionGroups);
  await db.plainSubProcedures.bulkCreate(helper.plainSubProcedures);
  await db.optionGroupsUnderSubProcedures.bulkCreate(helper.initialOptionGroupsUnderSubProcedures);
});

describe('Getting subprocedure-optiongroup-pairs from database', () => {
  test('subprocedure-optiongroup-pairs are returned as json', async () => {
    await api
      .get('/api/optionGroupsUnderSubProcedures/2/fi')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all entries associated to a specific subprocedure are returned', async () => {
    const response = await api.get('/api/optionGroupsUnderSubProcedures/1/fi');
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toEqual('TestiVaihtoehtoRyhmä1');
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
