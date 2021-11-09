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

beforeEach(async () => {
  // deletes the content from the table 'cases'
  await db.sequelize.sync({ force: true })
  // inserts test cases in the table 'cases'
  await Case.bulkCreate(initialCases)
})

describe('Getting cases from database', () => {

  test('cases are returned as json', async () => {
    await api
      .get('/api/cases')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all cases are returned', async () => {
    const response = await api.get('/api/cases')

    expect(response.body).toHaveLength(initialCases.length)
  })
})

describe('Adding a case to database', () => {

  test('a specific case is within the returned cases', async () => {
    const response = await api.get('/api/cases')
    const titles = response.body.map(r => r.title)

    expect(titles).toContain('TestCase2')
  })

  test('a valid case can be added ', async () => {
    const newCase = {
      title: "NewTitle1",
      hidden: false,
      anamnesis: "NewAnamnesis1",
    }  
  
    await api
      .post('/api/cases')
      .send(newCase)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/cases')
  
    const titles = response.body.map(r => r.title)
    const hiddens = response.body.map(r => r.hidden)
    const anamnesiss = response.body.map(r => r.anamnesis)
  
    expect(response.body).toHaveLength(initialCases.length + 1)
    expect(titles).toContain('NewTitle1')
    expect(hiddens).toContain(false)
    expect(anamnesiss).toContain('NewAnamnesis1')
  })
  
  test('case without title is not added', async () => {
    const newCase = {
      hidden: true,
      anamnesis: "NewAnamnesis",
    }  
    await api
      .post('/api/cases')
      .send(newCase)
      .expect(400)
  
    const response = await api.get('/api/cases')
  
    expect(response.body).toHaveLength(initialCases.length)
  })
})

describe('Updating a case in database', () => {
  test('hidden value can be changed', async () => {
    await api
      .put('/api/cases/1')
      .send({
        title: "TestCase1",
        hidden: false,
        anamnesis: "TestCase1Anamnesis",
      })
    const responseCheck = await api.get('/api/cases/1')
    expect(responseCheck.body.hidden).toEqual(false)
  })

  test('title can be changed to another valid title', async () => {
    await api
      .put('/api/cases/1')
      .send({
        title: "updatedTestCase",
        hidden: true,
        anamnesis: "TestCase1Anamnesis",
      })
    const responseCheck = await api.get('/api/cases/1')
    expect(responseCheck.body.title).toEqual('updatedTestCase')
  })

  test('invalid title is not updated', async () => {
    await api
      .put('/api/cases/1')
      .send({
        title: "t",
        hidden: true,
        anamnesis: "TestCase1Anamnesis",
      })
      .expect(400)
    const responseCheck = await api.get('/api/cases/1')
    expect(responseCheck.body.title).toEqual('TestCase1')
  })
})

afterAll(async () => {
  await db.sequelize.close()
})