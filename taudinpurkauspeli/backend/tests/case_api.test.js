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
    await Case.destroy({ truncate: true })
    // inserts test cases in the table 'cases'
    await Case.bulkCreate(initialCases)
  })

  test('there are two cases', async () => {
    const response = await api.get('/api/cases')

    expect(response.body).toHaveLength(initialCases.length)
  })
})

afterAll(() => {
  db.sequelize.close()
})
