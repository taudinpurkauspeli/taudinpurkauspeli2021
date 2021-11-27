module.exports = (sequelize, Sequelize) => {
  const DifferentialGroup = sequelize.define('differentialGroup', {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [2,999],
      }
    },
  });

  return DifferentialGroup;
};