module.exports = (sequelize, Sequelize) => {
  const Description = sequelize.define('description', {
    language: {
      type: Sequelize.STRING,
    },
    isDefault: {
      type: Sequelize.BOOLEAN,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Description;
};
