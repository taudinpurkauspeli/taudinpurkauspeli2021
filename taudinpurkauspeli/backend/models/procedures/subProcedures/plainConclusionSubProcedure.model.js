module.exports = (sequelize, Sequelize) => {
  const PlainConclusionSubProcedure = sequelize.define('plainConclusionSubProcedure', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'plain_conclusion_sub_procedures',
  });

  return PlainConclusionSubProcedure;
};
