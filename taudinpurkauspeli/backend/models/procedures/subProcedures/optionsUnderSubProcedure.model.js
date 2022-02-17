module.exports = (sequelize, Sequelize) => {
  const OptionsUnderSubProcedure = sequelize.define('optionsUnderSubProcedure', {
    optionGroupsUnderSubProcedureId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'optionGroupsUnderSubProcedures',
        key: 'id',
      },
    },
    plainOptionId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'plainOptions',
        key: 'id',
      },
    },
    isRequired: {
      // 0: wrong, 1: not required, but can contain, 2: is required, correct answer
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'options_under_sub_procedures',
  });

  return OptionsUnderSubProcedure;
};
