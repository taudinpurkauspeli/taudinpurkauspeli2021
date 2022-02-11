module.exports = (sequelize, Sequelize) => {
  // In previous version this table was called "exercise_hypotheses"

  const DifferentialsUnderCase = sequelize.define('differentialsUnderCase', {
    differentialGroupsUnderCaseId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'differentialGroupsUnderCases',
        key: 'id',
      },
    },
    plainDifferentialId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'plainDifferentials',
        key: 'id',
      },
    },
    language: {
      type: Sequelize.STRING,
    },
    isDefault: {
      type: Sequelize.BOOLEAN,
    },
    description: {
      type: Sequelize.TEXT,
    },
  }, {
    tableName: 'differentials_under_cases',
  });

  return DifferentialsUnderCase;
};
