const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)
const db = require('../../models/');
const subProcedures = db.subProcedures;

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
  
  describe('sub_procedures', () => {
    beforeEach(async () => {
      // deletes the content from the table 'cases'
      await db.sequelize.sync({ force: true })
      // inserts test cases in the table 'cases'
      await db.procedures.bulkCreate(initialProcedures)
      await db.cases.bulkCreate(initialCases)
      await subProcedures.bulkCreate(initialSubProcedures)
      await db.proceduresUnderCases.bulkCreate(initialProceduresUnderCases)
      await db.textSubProcedures.bulkCreate(initialTextSubprocedures)
    })
    
  test('all subprocedures are returned', async () => {
    const response = await api.get('/api/subprocedures')
    
    expect(response.body).toHaveLength(initialSubProcedures.length)
    })

  test('a valid text sub procedure can be added', async () => {
    const newSubProcedure = {
      priority: '1',
      type: 'TEXT'
    }  
  
    await api
      .post('/api/subprocedures')
      .send(newSubProcedure)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/subprocedures')

    expect(response.body).toHaveLength(initialProcedures.length + 1)
  })

  test('subprocedure without priority is not added', async () => {
    const newSubProcedure = {
      type: 'TEXT'
    }  
    await api
      .post('/api/subprocedures')
      .send(newSubProcedure)
      .expect(400)
  
    const response = await api.get('/api/subprocedures')
  
    expect(response.body).toHaveLength(initialProcedures.length)
  })

  test('procedure without type is not added', async () => {
    const newSubProcedure = {
      priority: '1'
    }
    await api
      .post('/api/subprocedures')
      .send(newSubProcedure)
      .expect(400)
  
    const response = await api.get('/api/subprocedures')
  
    expect(response.body).toHaveLength(initialProcedures.length)
  })

  test('priority can be changed', async () => {
    const responseUpdate = await api.put('/api/subprocedures/1')
      .send({
        priority: '42',
        type: 'TEXT'
      })
    const response = await api.get('/api/subprocedures/1')
    expect(response.body[0].subProcedures[0].priority).toEqual(42)
  })
})

test('type can be changed', async () => {
  const responseUpdate = await api.put('/api/subprocedures/1')
    .send({
      priority: "1",
      type: 'NOTTEXT'
    })
  const response = await api.get('/api/subprocedures/1')
  expect(response.body[0].subProcedures[0].type).toEqual('NOTTEXT')
})

afterAll(async () => {
    await db.sequelize.close()
})
