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
        title: 'TestTitle1',
        text: 'TestText1',
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
        subProceduresId: 2,
        proceduresUnderCaseProcedureCaseId: 1,
        title: 'TestTitle2',
        text: 'TestText2'
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

  test('text sub procedure without title is not added', async () => {
    const newTextSubProcedure = {
      subProceduresId: 2,
      proceduresUnderCaseProcedureCaseId: 1,
      title: null,
      text: 'TestText2'
    }  
    await api
      .post('/api/procedures')
      .send(newTextSubProcedure)
      .expect(400)
  
    const response = await api.get('/api/textsubprocedures')
  
    expect(response.body).toHaveLength(initialTextSubprocedures.length)
  })

  test('title can be changed', async () => {
    const responseUpdate = await api.put('/api/textsubprocedures/1')
      .send({
        subProceduresId: 1,
        proceduresUnderCaseProcedureCaseId: 1,
        title: 'this is a coconut',
        text: 'TestText2'
      })
    const responseCheck = await api.get('/api/textsubprocedures')
    const contentsCheck = responseCheck.body[0].title
    expect(contentsCheck).toEqual("this is a coconut")
  })
})
  
afterAll(async () => {
    await db.sequelize.close()
})
