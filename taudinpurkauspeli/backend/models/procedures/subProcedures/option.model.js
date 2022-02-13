module.exports = (sequelize, Sequelize) => {
  const Option = sequelize.define('option', {
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
  });

  return Option;
};
