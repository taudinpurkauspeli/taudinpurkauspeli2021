const subProcedureTypes = [
  {
    type: 'TEXT',
  },
  {
    type: 'QUESTION',
  },
];

const plainCases = [
  {
    hidden: true,
  },
  {
    hidden: true,
  },
];

const plainTextSubProcedures = [
  {
    plainSubProcedureId: 1,
  },
  {
    plainSubProcedureId: 2,
  },
];

const plainSubProcedures = [
  {
    subProcedureTypeId: 1,
    proceduresUnderCaseId: 1,
    priority: 1,
  },
  {
    subProcedureTypeId: 1,
    proceduresUnderCaseId: 1,
    priority: 2,
  },
];

const initialDifferentials = [
  {
    plainDifferentialId: 1,
    name: 'TestiDiffi1',
    language: 'fi',
    isDefault: true,
  },
  {
    plainDifferentialId: 2,
    name: 'TestiDiffi2',
    language: 'fi',
    isDefault: true,
  },
];

const initialEnglishDifferentials = [
  {
    plainDifferentialId: 1,
    name: 'TestDisease1',
    language: 'en',
    isDefault: false,
  },
];

const initialCases = [
  {
    title: 'TestiCase1',
    plainCaseId: 1,
    anamnesis: 'Testianamneesi',
    language: 'fi',
    isDefault: true,
  },
  {
    title: 'TestiCase2',
    plainCaseId: 2,
    anamnesis: 'Testianamneesi',
    language: 'fi',
    isDefault: true,
  },
];

const initialEnglishCases = [
  {
    title: 'TestCase1',
    plainCaseId: 1,
    anamnesis: 'TestCase1Anamnesis',
    language: 'en',
    isDefault: false,
  },
];

const initialDifferentialGroups = [
  {
    plainDifferentialGroupId: 1,
    name: 'TestiDiffiRyhmä1',
    language: 'fi',
    isDefault: true,
  },
  {
    plainDifferentialGroupId: 2,
    name: 'TestiDiffiRyhmä2',
    language: 'fi',
    isDefault: true,
  },
];

const initialEnglishDifferentialGroups = [
  {
    plainDifferentialGroupId: 1,
    name: 'TestDifferentialGroup1',
    language: 'en',
    isDefault: false,
  },
];

const initialDifferentialGroupsUnderCases = [
  {
    plainDifferentialGroupId: 1,
    plainCaseId: 1,
  },
  {
    plainDifferentialGroupId: 2,
    plainCaseId: 2,
  },
];

const initialDifferentialsUnderCases = [
  {
    differentialGroupsUnderCaseId: 1,
    plainDifferentialId: 2,
    description: 'Testi1',
    language: 'fi',
  },
  {
    differentialGroupsUnderCaseId: 2,
    plainDifferentialId: 1,
    description: 'Testi2',
    language: 'fi',
  },
  {
    differentialGroupsUnderCaseId: 1,
    plainDifferentialId: 1,
    description: 'Testi3',
    language: 'fi',
  },
];

const initialUsers = [
  {
    user_name: 'Test User',
    studentid: '123456789',
    mail: 'test.user@example.org',
  },
  {
    user_name: 'Test Admin',
    group: 'grp-taudinpurkausadmin',
    studentid: '',
    mail: 'test.admin@example.org',
  },
];

const initialProcedures = [
  {
    plainProcedureId: 1,
    name: 'TestiToimenpide1',
    language: 'fi',
    isDefault: true,
  },
  {
    plainProcedureId: 2,
    name: 'TestiToimenpide2',
    language: 'fi',
    isDefault: true,
  },
];

const initialEnglishProcedures = [
  {
    plainProcedureId: 1,
    name: 'TestProcedure1',
    language: 'en',
    isDefault: false,
  },
];

const initialSubProcedures = [
  {
    title: 'TestiOtsikko1',
    language: 'fi',
    isDefault: true,
    plainSubProcedureId: 1,
  },
  {
    title: 'TestiOtsikko2',
    language: 'fi',
    isDefault: true,
    plainSubProcedureId: 2,
  },
];

const initialProceduresUnderCases = [
  {
    plainCaseId: 1,
    plainProcedureId: 1,
    priority: 1,
  },
  {
    plainCaseId: 1,
    plainProcedureId: 2,
    priority: 1,
  },
];

const initialTextSubProcedures = [
  {
    plainTextSubProcedureId: 1,
    text: 'TestiTeksti1',
    language: 'fi',
    isDefault: true,
  },
  {
    plainTextSubProcedureId: 2,
    text: 'TestiTeksti2',
    language: 'fi',
    isDefault: true,
  },
];

module.exports = {
  subProcedureTypes,
  plainCases,
  plainTextSubProcedures,
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
  initialProceduresUnderCases,
  initialTextSubProcedures,
};
