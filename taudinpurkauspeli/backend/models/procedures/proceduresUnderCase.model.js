module.exports = (sequelize, Sequelize) => {
// In previous version this table was called ""
  const ProceduresUnderCase = sequelize.define('proceduresUnderCase', {
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
    procedureId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'procedures',
        key: 'id',
      },
    },
    priority: {
      type: Sequelize.INTEGER,
    },
  }, {
    tableName: 'procedures_under_cases',
  });

  return ProceduresUnderCase;
};
