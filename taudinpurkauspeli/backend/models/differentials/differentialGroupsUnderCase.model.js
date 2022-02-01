module.exports = (sequelize, Sequelize) => {
  const DifferentialGroupsUnderCase = sequelize.define('differentialGroupsUnderCase', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    plainCaseId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'plainCases',
        key: 'id',
      },
    },
    plainDifferentialGroupId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'plainDifferentialGroups',
        key: 'id',
      },
    },
  }, {
    tableName: 'differential_groups_under_cases',
  });

  return DifferentialGroupsUnderCase;
};
