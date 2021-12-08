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
    differentialId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'differentials',
        key: 'id',
      },
    },
    description: {
      type: Sequelize.TEXT,
    },
  }, {
    tableName: 'differentials_under_cases',
  });

  return DifferentialsUnderCase;
};
