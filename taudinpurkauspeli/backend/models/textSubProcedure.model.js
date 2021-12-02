const db = require('../models');

module.exports = (sequelize, Sequelize) => {
// In previous version this table was called "exercise"
  const textSubProcedures= sequelize.define('textSubProcedures', {
    totalSubId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'subProcedures',
          key: 'id'
        }
    },
    proceduresId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'proceduresUnderCases',
          key: 'procedureCaseId'
        }
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    text: {
      type: Sequelize.TEXT,
    },
  });

  return textSubProcedures;
};