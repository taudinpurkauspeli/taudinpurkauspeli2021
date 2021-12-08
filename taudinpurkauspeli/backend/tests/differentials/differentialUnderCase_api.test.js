const supertest = require('supertest');
const app = require('../../app');

const api = supertest(app);
const db = require('../../models');
const helper = require('../test_helper');

const DifferentialGroupUnderCase = db.differentialGroupsUnderCase;
const DifferentialGroup = db.differentialGroups;
const Differential = db.differentials;
const Case = db.cases;
const DifferentialUnderCase = db.differentalsUnderCases;

beforeEach(async () => {
  // deletes the content from the table 'differentials'
  await db.sequelize.sync({ force: true });
  // inserts test differentials in the table 'differentials'
  await Differential.bulkCreate(helper.initialDifferentials);
  await Case.bulkCreate(helper.initialCases);
  await DifferentialGroup.bulkCreate(helper.initialDifferentialGroups);
  await DifferentialGroupUnderCase.bulkCreate(helper.initialDifferentialGroupsUnderCases);
  await DifferentialUnderCase.bulkCreate(helper.initialDifferentialsUnderCases);
});

describe('Getting case-diff-pairs from database', () => {
  test('case-diff-pairs are returned as json', async () => {
    await api
      .get('/api/differentialsUnderCases/2')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all entries are returned', async () => {
    const response = await api.get('/api/differentialsUnderCases/1');

    expect(response.body).toHaveLength(2);
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
