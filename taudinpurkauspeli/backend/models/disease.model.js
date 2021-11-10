// create basic info for disease in diseases table - enables usage of sequelize options.

module.exports = (sequelize, Sequelize) => {
  const Disease = sequelize.define('disease', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [2,999],
      }
    },
  });

  return Disease;
};