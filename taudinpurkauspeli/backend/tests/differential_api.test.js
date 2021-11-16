const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const db = require('../models/');
const Differential = db.differentials;

const initialDifferentials = [
    {
      name: "TestDisease1",
    },
    {
      name: "TestDisease2",
    },
  ]
  
  beforeEach(async () => {
    // deletes the content from the table 'differentials'
    await db.sequelize.sync({ force: true })
    // inserts test differentials in the table 'differentials'
    await Differential.bulkCreate(initialDifferentials)
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
  
      expect(response.body).toHaveLength(initialDifferentials.length)
    })

    test('a specific differential is within the returned differential', async () => {
      const response = await api.get('/api/differentials')
      const names = response.body.map(r => r.name)
  
      expect(names).toContain('TestDisease2')
    })

    test('correct differential is returned when retrieved with id', async () => {
      const response = await api.get('/api/differentials/1')

      expect(response.body.name).toEqual('TestDisease1')
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
    
      expect(response.body).toHaveLength(initialDifferentials.length + 1)
      expect(names).toContain('NewTitle1')
    })
    
    test('differential without name is not added', async () => {
      const newDifferential = {}  
      await api
        .post('/api/differentials')
        .send(newDifferential)
        .expect(500)
    
      const response = await api.get('/api/differentials')
    
      expect(response.body).toHaveLength(initialDifferentials.length)
    })
  })

  afterAll(async () => {
    await db.sequelize.close()
  })
