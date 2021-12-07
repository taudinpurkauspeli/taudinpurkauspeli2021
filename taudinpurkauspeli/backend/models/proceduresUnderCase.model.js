const db = require('../models');
const Procedure = db.procedures;
const Case = db.cases;


module.exports = (sequelize, Sequelize) => {
// In previous version this table was called "exercise"
  const proceduresUnderCase = sequelize.define('proceduresUnderCase', {
    caseId: {
      type: Sequelize.INTEGER,
      references: {
        model: Case,
        key: 'id'
      }
    },
    procedureId: {
      type: Sequelize.INTEGER,
      references: {
        model: Procedure,
        key: 'id'
      }
    },
    priority: {
      type: Sequelize.INTEGER,
    },
  }, {
    tableName: 'procedures_under_cases',
  });

  return proceduresUnderCase;
};
