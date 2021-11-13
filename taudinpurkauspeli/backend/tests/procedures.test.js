const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const db = require('../models/');
const Procedure = db.procedures;

const initialProcedures = [
    {
      title: "TestProcedure1",
    },
    {
      title: "TestProcedure2",
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

  const initialProceduresUnderCase = [
    {
      caseId: "1",
      procedureId: "1",
      priority: 1,
    },
  ]
  
  describe('procedures', () => {
    beforeEach(async () => {
      // deletes the content from the table 'cases'
      await db.sequelize.sync({ force: true })
      // inserts test cases in the table 'cases'
      await Procedure.bulkCreate(initialProcedures)
      await db.cases.bulkCreate(initialCases)
      await db.proceduresUnderCases.bulkCreate(initialProceduresUnderCase)
    })
    
  test('all procedures are returned', async () => {
    const response = await api.get('/api/procedures')
    
    expect(response.body).toHaveLength(initialProcedures.length)
    })

  test('a valid case can be added ', async () => {
    const newProcedure = {
      title: "TestProcedure3",
    }  
  
    await api
      .post('/api/procedures')
      .send(newProcedure)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/procedures')
      
    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialProcedures.length + 1)
    expect(titles).toContain('TestProcedure3')
  })

  test('procedure without title is not added', async () => {
    const newProcedure = {
      title: null
    }  
    await api
      .post('/api/procedures')
      .send(newProcedure)
      .expect(400)
  
    const response = await api.get('/api/procedures')
  
    expect(response.body).toHaveLength(initialProcedures.length)
  })

  test('title can be changed', async () => {
    const responseUpdate = await api.put('/api/procedures/1')
      .send({
        title: "TestProcedure4",
      })
    const responseCheck = await api.get('/api/procedures/1')
    const contentsCheck = responseCheck.body[0].procedures[0].title
    expect(contentsCheck).toEqual("TestProcedure4")
  })
})
  
afterAll(async () => {
    await db.sequelize.close()
})
