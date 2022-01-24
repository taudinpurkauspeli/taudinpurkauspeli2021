module.exports = (sequelize, Sequelize) => {
// In previous version this table was called "exercise"
  const Case = sequelize.define('case', {
    language: {
      type: Sequelize.STRING,
    },
    isDefault: {
      type: Sequelize.BOOLEAN,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [2, 999],
      },
    },
    anamnesis: {
      type: Sequelize.TEXT,
    },
  });

  return Case;
};
