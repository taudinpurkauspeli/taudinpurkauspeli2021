module.exports = (sequelize, Sequelize) => {
// In previous version this table was called "exercise"
  const TextSubProcedure = sequelize.define('textSubProcedure', {
    language: {
      type: Sequelize.STRING,
    },
    isDefault: {
      type: Sequelize.BOOLEAN,
    },
    text: {
      type: Sequelize.TEXT,
    },
  }, {
    tableName: 'text_sub_procedures',
  });

  return TextSubProcedure;
};
