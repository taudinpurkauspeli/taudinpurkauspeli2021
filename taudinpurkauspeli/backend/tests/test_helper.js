const plainCases = [
  {
    hidden: true,
  },
  {
    hidden: true,
  },
];

const plainSubProcedures = [
  {
    priority: 1,
  },
  {
    priority: 2,
  },
];

const initialDifferentials = [
  {
    plainDifferentialId: 1,
    name: 'TestiDiffi1',
    language: 'fin',
    isDefault: true,
  },
  {
    plainDifferentialId: 2,
    name: 'TestiDiffi2',
    language: 'fin',
    isDefault: true,
  },
];

const initialEnglishDifferentials = [
  {
    plainDifferentialId: 1,
    name: 'TestDisease1',
    language: 'eng',
    isDefault: false,
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
    plainDifferentialGroupId: 1,
    name: 'TestiDiffiRyhmä1',
    language: 'fin',
    isDefault: true,
  },
  {
    plainDifferentialGroupId: 2,
    name: 'TestiDiffiRyhmä2',
    language: 'fin',
    isDefault: true,
  },
];

const initialEnglishDifferentialGroups = [
  {
    plainDifferentialGroupId: 1,
    name: 'TestDifferentialGroup1',
    language: 'eng',
    isDefault: false,
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
    plainProcedureId: 1,
    name: 'TestiToimenpide1',
    language: 'fin',
    isDefault: true,
  },
  {
    plainProcedureId: 2,
    name: 'TestiToimenpide2',
    language: 'fin',
    isDefault: true,
  },
];

const initialEnglishProcedures = [
  {
    plainProcedureId: 1,
    name: 'TestProcedure1',
    language: 'eng',
    isDefault: false,
  },
];

const initialSubProcedures = [
  {
    type: 'TEXT',
    proceduresUnderCaseId: 1,
    language: 'fin',
    isDefault: true,
  },
  {
    type: 'TEXT',
    proceduresUnderCaseId: 2,
    language: 'fin',
    isDefault: true,
  },
];

const initialEnglishSubProcedures = [
  {
    type: 'TEXT',
    proceduresUnderCaseId: 1,
    language: 'eng',
    isDefault: false,
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
  plainSubProcedures,
  initialDifferentials,
  initialEnglishDifferentials,
  initialCases,
  initialEnglishCases,
  initialDifferentialGroups,
  initialEnglishDifferentialGroups,
  initialDifferentialGroupsUnderCases,
  initialDifferentialsUnderCases,
  initialUsers,
  initialProcedures,
  initialEnglishProcedures,
  initialSubProcedures,
  initialEnglishSubProcedures,
  initialProceduresUnderCases,
  initialTextSubProcedures,
};
