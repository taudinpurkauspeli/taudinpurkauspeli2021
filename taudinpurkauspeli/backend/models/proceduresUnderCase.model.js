module.exports = (sequelize, Sequelize) => {
// In previous version this table was called "exercise"
  const proceduresUnderCase = sequelize.define('proceduresUnderCase', {
    caseId: {
      type: Sequelize.INTEGER,
    },
    procedureId: {
      type: Sequelize.INTEGER,
    },
    priority: {
      type: Sequelize.INTEGER,
    },
  });

  return proceduresUnderCase;
};
