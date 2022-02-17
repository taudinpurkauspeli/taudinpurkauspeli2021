module.exports = (sequelize, Sequelize) => {
  const PlainSubProcedure = sequelize.define('plainSubProcedure', {
    priority: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'plain_sub_procedures',
  });

  return PlainSubProcedure;
};
