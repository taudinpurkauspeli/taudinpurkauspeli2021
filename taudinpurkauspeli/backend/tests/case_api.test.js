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

  test('case without title is not added', async () => {
    const newCase = {
      title: "",
      hidden: true,
      anamnesis: "newAnamnesis",
    }  
    await api
      .post('/api/cases')
      .send(newCase)
      .expect(400)
  
    const response = await api.get('/api/cases')
  
    expect(response.body).toHaveLength(initialCases.length)
  })

  test('all cases are returned', async () => {
    const response = await api.get('/api/cases')

    expect(response.body).toHaveLength(initialCases.length)
  })

  test('a specific case is within the returned cases', async () => {
    const response = await api.get('/api/cases')
    const contents = response.body.map(r => r.title)

    expect(contents).toContain('TestCase2')
  })
})

afterAll(async () => {
  await db.sequelize.close()
})