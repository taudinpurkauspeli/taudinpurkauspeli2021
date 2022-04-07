module.exports = (sequelize, Sequelize) => {
  const ConclusionSubProcedure = sequelize.define('conclusionSubProcedure', {
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
    tableName: 'conclusion_sub_procedures',
  });

  return ConclusionSubProcedure;
};
