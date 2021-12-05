const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)
const db = require('../../models/');
const TSP = db.textSubProcedures;

const initialProcedures = [
    {
      title: "TestProcedure1",
    },
  ]
  
  const initialCases = [
    {
      title: "TestCase1",
      hidden: true,
      anamnesis: "TestCase1Anamnesis",
    },
  ]
  const initialSubProcedures = [
      {
        priority: "1",
        type: "TEXT",
      },
      {
        priority: "2",
        type: "TEXT",
      },
    ]
  
  const initialProceduresUnderCases = [
      {
        caseId: "1",
        procedureId: "1",
        procedureCaseId: "1",
        priority: "1",
      },
    ]
  
    const initialTextSubprocedures = [
      {
        subProcedureId: "1",
        proceduresUnderCaseProcedureCaseId: "1",
        title: 'TestTitle',
        text: 'TestText',
      },
    ]
  
  describe('text_sub_procedures', () => {
    beforeEach(async () => {
      // deletes the content from the table 'cases'
      await db.sequelize.sync({ force: true })
      // inserts test cases in the table 'cases'
      await db.procedures.bulkCreate(initialProcedures)
      await db.cases.bulkCreate(initialCases)
      await db.subProcedures.bulkCreate(initialSubProcedures)
      await db.proceduresUnderCases.bulkCreate(initialProceduresUnderCases)
      await TSP.bulkCreate(initialTextSubprocedures)
    })
    
  test('all text sub procedures are returned', async () => {
    const response = await api.get('/api/textsubprocedures')
    
    expect(response.body).toHaveLength(initialProcedures.length)
    })

  test('a valid text sub procedure can be added', async () => {
    const newTextSubProcedure = {
        subProcedureId: "1",
        proceduresUnderCaseProcedureCaseId: "1",
        title: 'TestTitle',
        text: 'TestText',
      }
  
    await api
      .post('/api/textsubprocedures')
      .send(newTextSubProcedure)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/textsubprocedures')
      
    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialProcedures.length + 1)
    expect(titles).toContain('TestTitle2')
  })

  /* test('procedure without title is not added', async () => {
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
  }) */
})
  
afterAll(async () => {
    await db.sequelize.close()
})
