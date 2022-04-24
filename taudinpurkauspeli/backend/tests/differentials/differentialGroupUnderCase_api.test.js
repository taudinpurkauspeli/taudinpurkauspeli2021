const supertest = require('supertest');
const app = require('../../app');

const api = supertest(app);
const db = require('../../models');
const helper = require('../test_helper');

const DifferentialGroupUnderCase = db.differentialGroupsUnderCases;
const DifferentialGroup = db.differentialGroups;
const PlainCase = db.plainCases;
const PlainDifferentialGroup = db.plainDifferentialGroups;

beforeEach(async () => {
  // deletes the content from the table 'differentials'
  await db.sequelize.sync({ force: true });
  // inserts test differentials in the table 'differentials'
  await PlainCase.bulkCreate(helper.plainCases);
  await PlainDifferentialGroup.bulkCreate([{}, {}]);
  await DifferentialGroup.bulkCreate(helper.initialDifferentialGroups);
  await DifferentialGroupUnderCase.bulkCreate(helper.initialDifferentialGroupsUnderCases);
});

describe('Getting case-diffgroup-pairs from database', () => {
  test('case-diffgroup-pairs are returned as json', async () => {
    await api
      .get('/api/differentialGroupsUnderCases/2/fi')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all entries associated to a specific case are returned', async () => {
    const response = await api.get('/api/differentialGroupsUnderCases/1/fi');
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toEqual('TestiDiffiRyhmä1');
  });
});

describe('Adding case-diffgroup-pairs to database', () => {
  test('Case-diffgroup-pairs can be added', async () => {
    const pair = {
      caseId: 1,
      differentialGroupId: 2,
    };

    await api
      .post('/api/differentialGroupsUnderCases/fi')
      .send(pair)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/differentialGroupsUnderCases/1/fi');
    expect(response.body).toHaveLength(2);
  });
});

describe('Deleting case-diffgroup-pairs from database', () => {
  test('Differentialgroup can be deleted from case', async () => {
    await api
      .del('/api/differentialGroupsUnderCases/1')
      .expect(204);

    const returnedDifferentialGroups = await api.get('/api/differentialGroupsUnderCases/1/fi');
    expect(returnedDifferentialGroups.body).toHaveLength(0);
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
