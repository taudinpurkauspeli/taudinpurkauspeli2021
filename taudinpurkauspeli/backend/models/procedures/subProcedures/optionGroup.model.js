module.exports = (sequelize, Sequelize) => {
  const OptionGroup = sequelize.define('optionGroup', {
    language: {
      type: Sequelize.STRING,
    },
    isDefault: {
      type: Sequelize.BOOLEAN,
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [2, 999],
      },
    },
  }, {
    tableName: 'option_groups',
  });

  return OptionGroup;
};
