const subProcedureTypes = [
  {
    type: 'TEXT',
  },
  {
    type: 'QUESTION',
  },
  {
    type: 'INTERVIEW',
  },
  {
    type: 'CONCLUSION',
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

const plainConclusionSubProcedures = [
  {
    plainSubProcedureId: 3,
    plainDifferentialId: 1,
  },
]

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
  {
    subProcedureTypeId: 4,
    proceduresUnderCaseId: 1,
    priority: 3,
  }
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
    plainDescriptionId: 2,
  },
  {
    differentialGroupsUnderCaseId: 2,
    plainDifferentialId: 1,
    plainDescriptionId: 2,
  },
  {
    differentialGroupsUnderCaseId: 1,
    plainDifferentialId: 1,
    plainDescriptionId: 1,
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
  {
    title: 'TestiDiagnoosi',
    language: 'fi',
    isDefault: true,
    plainSubProcedureId: 3,
  }
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

const initialConclusionSubProcedures = [
  {
    plainConclusionSubProcedureId: 1,
    text: 'Suoritettu',
    language: 'fi',
    isDefault: true,
  },
];

const initialOptions = [
  {
    plainOptionId: 1,
    name: 'TestiVaihtoehto1',
    language: 'fi',
    isDefault: true,
  },
  {
    plainOptionId: 2,
    name: 'TestiVaihtoehto2',
    language: 'fi',
    isDefault: true,
  },
];

const initialEnglishOptions = [
  {
    plainOptionId: 1,
    name: 'TestOption1',
    language: 'en',
    isDefault: false,
  },
];

const initialOptionGroups = [
  {
    plainOptionGroupId: 1,
    name: 'TestiVaihtoehtoRyhmä1',
    language: 'fi',
    isDefault: true,
  },
  {
    plainOptionGroupId: 2,
    name: 'TestiVaihtoehtoRyhmä2',
    language: 'fi',
    isDefault: true,
  },
];

const initialEnglishOptionGroups = [
  {
    plainOptionGroupId: 1,
    name: 'TestOptionGroup1',
    language: 'en',
    isDefault: false,
  },
];

const initialOptionGroupsUnderSubProcedures = [
  {
    plainOptionGroupId: 1,
    plainSubProcedureId: 1,
  },
  {
    plainOptionGroupId: 2,
    plainSubProcedureId: 2,
  },
];

const initialDescriptions = [
  {
    language: 'fi',
    isDefault: true,
    description: 'TestiKuvaus1',
    plainDescriptionId: 1,
  },
  {
    language: 'fi',
    isDefault: true,
    description: 'TestiKuvaus2',
    plainDescriptionId: 2,
  },
];

const initialOptionsUnderSubProcedures = [
  {
    optionGroupsUnderSubProcedureId: 1,
    plainOptionId: 1,
    plainDescriptionId: 1,
    isRequired: 0,
  },
  {
    optionGroupsUnderSubProcedureId: 1,
    plainOptionId: 2,
    plainDescriptionId: 2,
    isRequired: 1,
  },
  {
    optionGroupsUnderSubProcedureId: 2,
    plainOptionId: 1,
    plainDescriptionId: 1,
    isRequired: 2,
  },
];

const initialQuestionOptionsUnderSubProcedures = [
  {
    plainSubProcedureId: 1,
    plainOptionId: 1,
    plainDescriptionId: 1,
    isCorrect: true,
  },
  {
    plainSubProcedureId: 1,
    plainOptionId: 2,
    plainDescriptionId: 2,
    isCorrect: false,
  },
  {
    plainSubProcedureId: 2,
    plainOptionId: 1,
    plainDescriptionId: 1,
    isCorrect: false,
  },
];

module.exports = {
  subProcedureTypes,
  plainCases,
  plainTextSubProcedures,
  plainSubProcedures,
  plainConclusionSubProcedures,
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
  initialOptions,
  initialEnglishOptions,
  initialOptionGroups,
  initialEnglishOptionGroups,
  initialOptionGroupsUnderSubProcedures,
  initialDescriptions,
  initialOptionsUnderSubProcedures,
  initialQuestionOptionsUnderSubProcedures,
  initialConclusionSubProcedures,
};
