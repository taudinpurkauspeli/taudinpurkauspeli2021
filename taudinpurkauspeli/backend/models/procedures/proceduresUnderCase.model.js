module.exports = (sequelize, Sequelize) => {
// In previous version this table was called ""
  const ProceduresUnderCase = sequelize.define('proceduresUnderCase', {
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
    plainProcedureId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'plainProcedures',
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
