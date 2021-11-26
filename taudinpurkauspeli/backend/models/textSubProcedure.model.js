const db = require('../models');
const SubProcedure = db.subProcedures;
const ProceduresUnderCase = db.proceduresUnderCases;

module.exports = (sequelize, Sequelize) => {
// In previous version this table was called "exercise"
  const textSubProcedures= sequelize.define('textSubProcedures', {
    totalSubId: {
        type: Sequelize.INTEGER,
        references: {
          model: SubProcedure,
          key: 'id'
        }
    },
    procedureId: {
        type: Sequelize.INTEGER,
        references: {
          model: ProceduresUnderCase,
          key: 'procedureId'
        }
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Text: {
      type: Sequelize.Text,
    },
  });

  return textSubProcedures;
};