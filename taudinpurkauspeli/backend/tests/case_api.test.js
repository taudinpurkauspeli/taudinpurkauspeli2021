const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const db = require('../models/');
const { requestLogger } = require('../utils/middleware');
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
  beforeAll(async () => {
    // adds a DROP TABLE IF EXISTS before trying to create the table 'Case'
    try {
      await Case.destroy({ truncate: true })
      await Case.bulkCreate(initialCases)
    } catch (err) {
      console.log(err)
    }

  })

  test('there are two cases', async () => {
    try {
      var response = await api.get('/api/cases')
    } catch (err) {
      console.log(err)
    }

    expect(response.body).toHaveLength(initialCases.length)
  })
})

afterAll(() => {
  db.sequelize.close()
})
