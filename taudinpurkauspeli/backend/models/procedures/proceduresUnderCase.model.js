module.exports = (sequelize, Sequelize) => {
// In previous version this table was called ""
  const proceduresUnderCase = sequelize.define('proceduresUnderCase', {
    caseId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'cases',
        key: 'id',
      },
    },
    procedureId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'procedures',
        key: 'id',
      },
    },
    procedureCaseId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    priority: {
      type: Sequelize.INTEGER,
    },
  }, {
    tableName: 'procedures_under_cases',
  });

  return proceduresUnderCase;
};
