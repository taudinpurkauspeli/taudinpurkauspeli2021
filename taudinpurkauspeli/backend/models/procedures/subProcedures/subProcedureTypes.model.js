module.exports = (sequelize, Sequelize) => {
  const SubProcedureType = sequelize.define('subProcedureType', {
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'sub_procedure_types',
  });

  return SubProcedureType;
};
