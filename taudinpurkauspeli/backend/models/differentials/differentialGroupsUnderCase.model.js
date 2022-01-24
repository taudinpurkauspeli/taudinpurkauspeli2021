module.exports = (sequelize, Sequelize) => {
  const DifferentialGroupsUnderCase = sequelize.define('differentialGroupsUnderCase', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    caseId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'cases',
        key: 'initialCaseId',
      },
    },
    differentialGroupId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'differentialGroups',
        key: 'id',
      },
    },
  }, {
    tableName: 'differential_groups_under_cases',
  });

  return DifferentialGroupsUnderCase;
};
