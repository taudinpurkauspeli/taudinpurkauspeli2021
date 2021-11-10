const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const db = require('../models/');
const Disease = db.diseases;

const initialDiseases = [
    {
      name: "TestDisease1",
    },
    {
      name: "TestDisease2",
    },
  ]
  
  beforeEach(async () => {
    // deletes the content from the table 'diseases'
    await db.sequelize.sync({ force: true })
    // inserts test diseases in the table 'diseases'
    await Disease.bulkCreate(initialDiseases)
  })
  
  describe('Getting diseases from database', () => {

    test('diseases are returned as json', async () => {
      await api
        .get('/api/diseases')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  
    test('all diseases are returned', async () => {
      const response = await api.get('/api/diseases')
  
      expect(response.body).toHaveLength(initialDiseases.length)
    })
  })

  describe('Adding a disease to database', () => {

    test('a specific disease is within the returned diseases', async () => {
      const response = await api.get('/api/diseases')
      const names = response.body.map(r => r.name)
  
      expect(names).toContain('TestDisease2')
    })
  
    test('a valid disease can be added ', async () => {
      const newDisease = {
        name: "NewTitle1",
      }  
    
      await api
        .post('/api/diseases')
        .send(newDisease)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/diseases')
    
      const names = response.body.map(r => r.name)
    
      expect(response.body).toHaveLength(initialDiseases.length + 1)
      expect(names).toContain('NewTitle1')
    })
    
    test('disease without title is not added', async () => {
      const newDisease = {}  
      await api
        .post('/api/diseases')
        .send(newDisease)
        .expect(400)
    
      const response = await api.get('/api/diseases')
    
      expect(response.body).toHaveLength(initialDiseases.length)
    })
  })

  afterAll(async () => {
    await db.sequelize.close()
  })
