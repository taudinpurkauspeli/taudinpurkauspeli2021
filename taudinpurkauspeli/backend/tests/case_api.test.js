const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const db = require('../models/');
const Case = db.cases;

const initialCases = [
  {
    title: "TestCase1",
    hidden: true,
    anamnesis: "TestCase1Anamnesis",
  },
  {
    title: "TestCase2",
    hidden: true,
    anamnesis: "TestCase2Anamnesis",
  },
]

describe('cases', () => {
  beforeEach(async () => {
    // deletes the content from the table 'cases'
    await db.sequelize.sync({ force: true })
    // inserts test cases in the table 'cases'
    await Case.bulkCreate(initialCases)
  })

  test('cases are returned as json', async () => {
    await api
      .get('/api/cases')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all cases are returned', async () => {
    const response = await api.get('/api/cases')

    expect(response.body).toHaveLength(initialCases.length)
  })

  test('a specific case is within the returned cases', async () => {
    const response = await api.get('/api/cases')
    const titles = response.body.map(r => r.title)

    expect(titles).toContain('TestCase2')
  })

  test('a valid case can be added ', async () => {
    const newCase = {
      title: "NewTitle1",
      hidden: false,
      anamnesis: "NewAnamnesis1",
    }  
  
    await api
      .post('/api/cases')
      .send(newCase)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/cases')
  
    const titles = response.body.map(r => r.title)
    const hiddens = response.body.map(r => r.hidden)
    const anamnesiss = response.body.map(r => r.anamnesis)
  
    expect(response.body).toHaveLength(initialCases.length + 1)
    expect(titles).toContain('NewTitle1')
    expect(hiddens).toContain(false)
    expect(anamnesiss).toContain('NewAnamnesis1')
  })
  
  test('case without title is not added', async () => {
    const newCase = {
      hidden: true,
      anamnesis: "NewAnamnesis",
    }  
    await api
      .post('/api/cases')
      .send(newCase)
      .expect(400)
  
    const response = await api.get('/api/cases')
  
    expect(response.body).toHaveLength(initialCases.length)
  })

})

afterAll(async () => {
  await db.sequelize.close()
})