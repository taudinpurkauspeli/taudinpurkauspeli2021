module.exports = (sequelize, Sequelize) => {
  
  const DifferentialGroupsUnderCase = sequelize.define('differentialGroupsUnderCase', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      caseId: {
          type: Sequelize.INTEGER,
          references: {
              model: 'cases',
              key: 'id'
          }
      },
      differentialGroupId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'differentialGroups',
            key: 'id'
          }
        },
    });
  
    return DifferentialGroupsUnderCase;
  };