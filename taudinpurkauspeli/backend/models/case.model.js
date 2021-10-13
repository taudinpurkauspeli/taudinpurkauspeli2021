module.exports = (sequelize, Sequelize) => {
// In previous version this table was called "exercise"
  const Case = sequelize.define('case', {
    title: {
      type: Sequelize.STRING,
    },
    hidden: {
      type: Sequelize.BOOLEAN,
    },
    anamnesis: {
      type: Sequelize.TEXT,
    },
  });

  return Case;
};
