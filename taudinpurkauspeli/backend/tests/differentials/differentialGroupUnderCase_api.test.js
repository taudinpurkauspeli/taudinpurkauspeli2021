const supertest = require('supertest');
const app = require('../../app');

const api = supertest(app);
const db = require('../../models');
const helper = require('../test_helper');

const DifferentialGroupUnderCase = db.differentialGroupsUnderCase;
const DifferentialGroup = db.differentialGroups;
const Case = db.cases;

beforeEach(async () => {
  // deletes the content from the table 'differentials'
  await db.sequelize.sync({ force: true });
  // inserts test differentials in the table 'differentials'
  await Case.bulkCreate(helper.initialCases);
  await DifferentialGroup.bulkCreate(helper.initialDifferentialGroups);
  await DifferentialGroupUnderCase.bulkCreate(helper.initialDifferentialGroupsUnderCases);
});

describe('Getting case-diffgroup-pairs from database', () => {
  test('case-diffgroup-pairs are returned as json', async () => {
    await api
      .get('/api/differentialsUnderCases/2')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all entries associated to a specific case are returned', async () => {
    const response = await api.get('/api/differentialGroupsUnderCases/1');
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toEqual('TestDifferentialGroup1');
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
