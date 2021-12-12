// create basic info for disease in diseases table - enables usage of sequelize options.

module.exports = (sequelize, Sequelize) => {
  const Differential = sequelize.define('differential', {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [2, 999],
      },
    },
  });

  return Differential;
};
