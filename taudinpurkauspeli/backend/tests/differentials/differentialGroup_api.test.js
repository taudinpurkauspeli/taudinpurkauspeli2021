const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)
const db = require('../../models');
const helper = require('../test_helper');
const DifferentialGroup = db.differentialGroups;

beforeEach(async () => {
  await db.sequelize.sync({ force: true })
  await DifferentialGroup.bulkCreate(helper.initialDifferentialGroups)
})

describe('Getting differentialgroups from database', () => {

  test('differentialgroups are returned as json', async () => {
    await api
      .get('/api/differentialGroups')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all differentialgroups are returned', async () => {
    const response = await api.get('/api/differentialGroups')

    expect(response.body).toHaveLength(helper.initialDifferentialGroups.length)
  })
})

describe('Adding a differentialgroup to database', () => {

  test('a specific differentialgroup is within the returned differentialgroups', async () => {
    const response = await api.get('/api/differentialGroups')
    const names = response.body.map(r => r.name)

    expect(names).toContain('TestDifferentialGroup2')
  })

  test('a valid differentialgroup can be added ', async () => {
    const newDifferentialGroup = {
      name: "newDifferentialGroup",
    }  
  
    await api
      .post('/api/differentialGroups')
      .send(newDifferentialGroup)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/differentialGroups')
  
    const names = response.body.map(r => r.name)
  
    expect(response.body).toHaveLength(helper.initialDifferentialGroups.length + 1)
    expect(names).toContain('newDifferentialGroup')
  })
  
  test('differentialgroup without name is not added', async () => {
    const newDifferentialGroup = {}  
    await api
      .post('/api/differentialGroups')
      .send(newDifferentialGroup)
      .expect(500)
  
    const response = await api.get('/api/differentialGroups')
  
    expect(response.body).toHaveLength(helper.initialDifferentialGroups.length)
  })

  test('differentialgroup that is already in database is not added', async () => {
    const newDifferentialGroup = {
      name: "TestDifferentialGroup1",
    }  
  
    await api
      .post('/api/differentialGroups')
      .send(newDifferentialGroup)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/differentialGroups')
    expect(response.body).toHaveLength(helper.initialDifferentialGroups.length)
  })
})

afterAll(async () => {
  await db.sequelize.close()
})