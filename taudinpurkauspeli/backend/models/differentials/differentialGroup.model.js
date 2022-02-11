module.exports = (sequelize, Sequelize) => {
  const DifferentialGroup = sequelize.define('differentialGroup', {
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
    tableName: 'differential_groups',
  });

  return DifferentialGroup;
};
