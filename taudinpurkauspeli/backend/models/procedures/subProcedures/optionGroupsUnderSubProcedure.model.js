module.exports = (sequelize, Sequelize) => {
  const OptionGroupsUnderSubProcedure = sequelize.define('optionGroupsUnderSubProcedure', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    plainOptionGroupId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'plainOptionGroups',
        key: 'id',
      },
    },
    plainSubProcedureId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'plainSubProcedures',
        key: 'id',
      },
    },
  }, {
    tableName: 'option_groups_under_sub_procedures',
  });

  return OptionGroupsUnderSubProcedure;
};
