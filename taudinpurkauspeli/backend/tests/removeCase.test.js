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

  test('Case can be deleted', async () => {
    const responseRemove = await api.delete('/api/cases/1')
      .send({
        id: 1,
      })
    expect(responseRemove.statusCode).toEqual(200)
  })
})

test('Case cannot be deleted', async () => {
    const responseRemove = await api.delete('/api/cases/5')
      .send({
        id: 5,
      })
    expect(responseRemove.statusCode).toEqual(404)
  })

afterAll(async () => {
  await db.sequelize.close()
})