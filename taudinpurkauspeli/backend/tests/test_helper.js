const initialDifferentials = [
  {
    name: 'TestDisease1',
  },
  {
    name: 'TestDisease2',
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

const initialDifferentialGroups = [
  {
    name: 'TestDifferentialGroup1',
  },
  {
    name: 'TestDifferentialGroup2',
  },
];

const initialDifferentialGroupsUnderCases = [
  {
    differentialGroupId: 1,
    caseId: 1,
  },
  {
    differentialGroupId: 2,
    caseId: 2,
  },
];

const initialDifferentialsUnderCases = [
  {
    differentialGroupsUnderCaseId: 1,
    differentialId: 2,
    description: 'Testi1',
  },
  {
    differentialGroupsUnderCaseId: 2,
    differentialId: 1,
    description: 'Testi2',
  },
  {
    differentialGroupsUnderCaseId: 1,
    differentialId: 1,
    description: 'Testi3',
  },
];

const initialUsers = [
  {
    user_name: 'Test User',
    affiliation: 'student',
    studentid: '123456789',
    mail: 'test.user@example.org',
  },
  {
    user_name: 'Test Admin',
    affiliation: 'faculty',
    studentid: '',
    mail: 'test.admin@example.org',
  },
];

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

const initialSubProcedures = [
  {
    priority: 1,
    type: 'TEXT',
  },
  {
    priority: 1,
    type: 'TEXT',
  },
];

const initialProceduresUnderCases = [
  {
    caseId: 1,
    procedureId: 1,
    procedureCaseId: 1,
    priority: 1,
  },
];

const initialTextSubProcedures = [
  {
    subProcedureId: 1,
    proceduresUnderCaseProcedureCaseId: 1,
    title: 'TestTitle',
    text: 'TestText',
  },
];

module.exports = {
  initialDifferentials,
  initialCases,
  initialDifferentialGroups,
  initialDifferentialGroupsUnderCases,
  initialDifferentialsUnderCases,
  initialUsers,
  initialProcedures,
  initialSubProcedures,
  initialProceduresUnderCases,
  initialTextSubProcedures,
};
