module.exports = (sequelize, Sequelize) => {
  const InitialCase = sequelize.define('initialCase', {
    hidden: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  }, {
    tableName: 'initial_cases',
    timestamps: false,
  });

  return InitialCase;
};
