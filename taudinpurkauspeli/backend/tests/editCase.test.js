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

  test('hidden value can be changed', async () => {
    const responseUpdate = await api.put('/api/cases/1')
      .send({
        title: "TestCase5",
        hidden: false,
        anamnesis: "TestCase1Anamnesis",
      })
    const responseCheck = await api.get('/api/cases/1')
    const contentsCheck = responseCheck.body.hidden
    expect(contentsCheck).toEqual(false)
  })
})

afterAll(async () => {
  await db.sequelize.close()
})