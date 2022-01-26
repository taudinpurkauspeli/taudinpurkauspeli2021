const plainCases = [
  {
    hidden: true,
  },
  {
    hidden: true,
  },
];

const initialDifferentials = [
  {
    plainDifferentialId: 1,
    name: 'TestiDiffi1',
    language: 'fin',
  },
  {
    plainDifferentialId: 2,
    name: 'TestiDiffi2',
    language: 'fin',
  },
];

const initialEnglishDifferentials = [
  {
    plainDifferentialId: 1,
    name: 'TestDisease1',
    language: 'eng',
  },
];

const initialCases = [
  {
    title: 'TestiCase1',
    plainCaseId: 1,
    anamnesis: 'Testianamneesi',
    language: 'fin',
    isDefault: true,
  },
  {
    title: 'TestiCase2',
    plainCaseId: 2,
    anamnesis: 'Testianamneesi',
    language: 'fin',
    isDefault: true,
  },
];

const initialEnglishCases = [
  {
    title: 'TestCase1',
    plainCaseId: 1,
    anamnesis: 'TestCase1Anamnesis',
    language: 'eng',
    isDefault: false,
  },
];

const initialDifferentialGroups = [
  {
    name: 'TestDifferentialGroup1',
    language: 'fin',
  },
  {
    name: 'TestDifferentialGroup2',
    language: 'fin',
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
    language: 'fin',
  },
  {
    differentialGroupsUnderCaseId: 2,
    differentialId: 1,
    description: 'Testi2',
    language: 'fin',
  },
  {
    differentialGroupsUnderCaseId: 1,
    differentialId: 1,
    description: 'Testi3',
    language: 'fin',
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
    language: 'fin',
  },
  {
    title: 'TestProcedure2',
    language: 'fin',
  },
];

const initialSubProcedures = [
  {
    priority: 1,
    type: 'TEXT',
    proceduresUnderCaseId: 1,
    language: 'fin',
  },
  {
    priority: 1,
    type: 'TEXT',
    proceduresUnderCaseId: 2,
    language: 'fin',
  },
];

const initialProceduresUnderCases = [
  {
    caseId: 1,
    procedureId: 1,
    priority: 1,
  },
  {
    caseId: 1,
    procedureId: 2,
    priority: 1,
  },
];

const initialTextSubProcedures = [
  {
    subProcedureId: 1,
    title: 'TestTitle',
    text: 'TestText',
    language: 'fin',
  },
];

module.exports = {
  plainCases,
  initialDifferentials,
  initialEnglishDifferentials,
  initialCases,
  initialEnglishCases,
  initialDifferentialGroups,
  initialDifferentialGroupsUnderCases,
  initialDifferentialsUnderCases,
  initialUsers,
  initialProcedures,
  initialSubProcedures,
  initialProceduresUnderCases,
  initialTextSubProcedures,
};
