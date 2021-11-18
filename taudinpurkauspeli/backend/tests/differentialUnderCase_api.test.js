const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const db = require('../models/');
const Case = db.cases;
const Differential = db.differentials;
const DifferentialUnderCase = db.differentalsUnderCases;

const initialDifferentials = [
    {
      name: "TestDisease1",
    },
    {
      name: "TestDisease2",
    },
  ]

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

  const initialDifferentialsUnderCases = [
    {
      caseId: 1,
      differentialId: 2,
      description: "Testi1",
    },
    {
      caseId: 2,
      differentialId: 1,
      description: "Testi2"
    },
    {
      caseId: 1,
      differentialId: 1,
      description: "Testi3"
    }
  ]

  beforeEach(async () => {
    // deletes the content from the table 'differentials'
    await db.sequelize.sync({ force: true })
    // inserts test differentials in the table 'differentials'
    await Differential.bulkCreate(initialDifferentials)
    await Case.bulkCreate(initialCases)
    await DifferentialUnderCase.bulkCreate(initialDifferentialsUnderCases)
  })

  describe('Getting case-diff-pairs from database', () => {

    test('case-diff-pairs are returned as json', async () => {
      await api
        .get('/api/differentialsUnderCases/2')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  
    test('all entries are returned', async () => {
      const response = await api.get('/api/differentialsUnderCases/1')
  
      expect(response.body).toHaveLength(2)
    })
  })

  afterAll(async () => {
    await db.sequelize.close()
  })