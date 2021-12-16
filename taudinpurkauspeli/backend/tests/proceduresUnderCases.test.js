/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const db = require('../models/');
const Procedure = db.procedures;
const ProcedureUnderCase = db.proceduresUnderCases;

const initialProcedures = [
  {
    title: 'TestProcedure1',
  },
  {
    title: 'TestProcedure2',
  },
  {
    title: 'TestProcedure3',
  },
];

const initialCases = [
  {
    title: 'TestCase1',
    hidden: true,
    anamnesis: 'TestCase1Anamnesis',
  },
  {
    title: 'TestCase2',
    hidden: true,
    anamnesis: 'TestCase2Anamnesis',
  },
];

const initialProceduresUnderCase = [
  {
    caseId: '1',
    procedureId: '1',
    priority: 1,
  },
  {
    caseId: '1',
    procedureId: '2',
    priority: 1,
  },
];

describe('procedures', () => {
  beforeEach(async () => {
    // deletes the content from the table 'cases'
    await db.sequelize.sync({ force: true });
    // inserts test cases in the table 'cases'
    await db.procedures.bulkCreate(initialProcedures);
    await db.cases.bulkCreate(initialCases);
    await db.proceduresUnderCases.bulkCreate(initialProceduresUnderCase);
  });

  test('all procedures under cases are returned', async () => {
    const response = await api.get('/api/proceduresUnderCases');

    expect(response.body).toHaveLength(initialProceduresUnderCase.length);
  });

  test('a valid procedure under case can be added ', async () => {
    const newProcedureUnderCase = {
      caseId: '1',
      procedureId: '3',
      priority: 3,
    };

    await api
      .post('/api/proceduresUnderCases')
      .send(newProcedureUnderCase)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/proceduresUnderCases');

    const priorities = response.body.map((r) => r.priority);

    expect(response.body).toHaveLength(initialProceduresUnderCase.length + 1);
    expect(priorities).toContain(3);
  });

  test('priority can be changed', async () => {
    const responseUpdate = await api.put('/api/proceduresUnderCases/1')
      .send({
        caseId: '1',
        procedureId: '1',
        priority: 55,
      });
    const responseCheck = await api.get('/api/proceduresUnderCases');
    const priorities = responseCheck.body.map((r) => r.priority);

    expect(priorities).toContain(55);
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
