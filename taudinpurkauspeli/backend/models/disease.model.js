// create basic info for disease in diseases table - enables usage of sequelize options.

module.exports = (sequelize, Sequelize) => {
  const Disease = sequelize.define('disease', {
    category: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  return Disease;
};