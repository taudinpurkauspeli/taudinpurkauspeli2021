module.exports = (sequelize, Sequelize) => {
// In previous version this table was called "exercise"
  const Procedure = sequelize.define('procedure', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Procedure;
};
