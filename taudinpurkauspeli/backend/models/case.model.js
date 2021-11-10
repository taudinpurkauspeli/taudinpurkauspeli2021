module.exports = (sequelize, Sequelize) => {
// In previous version this table was called "exercise"
  const Case = sequelize.define('case', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [2,999],
      }
    },
    hidden: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    anamnesis: {
      type: Sequelize.TEXT,
    },
  });

  return Case;
};
