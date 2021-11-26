const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)
const db = require('../../models');
const helper = require('../test_helper');
const Differential = db.differentials;
  
beforeEach(async () => {
  // deletes the content from the table 'differentials'
  await db.sequelize.sync({ force: true })
  // inserts test differentials in the table 'differentials'
  await Differential.bulkCreate(helper.initialDifferentials)
})
  
  describe('Getting differentials from database', () => {
    test('differentials are returned as json', async () => {
      await api
        .get('/api/differentials')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  
    test('all differentials are returned', async () => {
      const response = await api.get('/api/differentials')
  
      expect(response.body).toHaveLength(helper.initialDifferentials.length)
    })

    test('a specific differential is within the returned differential', async () => {
      const response = await api.get('/api/differentials')
      const names = response.body.map(r => r.name)
  
      expect(names).toContain('TestDisease2')
    })
  })

  describe('Adding a differential to database', () => {
    test('a valid differential can be added ', async () => {
      const newDifferential = {
        name: "NewTitle1",
      }  
    
      await api
        .post('/api/differentials')
        .send(newDifferential)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/differentials')
    
      const names = response.body.map(r => r.name)
    
      expect(response.body).toHaveLength(helper.initialDifferentials.length + 1)
      expect(names).toContain('NewTitle1')
    })
    
    test('differential without name is not added', async () => {
      const newDifferential = {}  
      await api
        .post('/api/differentials')
        .send(newDifferential)
        .expect(500)
    
      const response = await api.get('/api/differentials')
    
      expect(response.body).toHaveLength(helper.initialDifferentials.length)
    })
  })

  afterAll(async () => {
    await db.sequelize.close()
  })
