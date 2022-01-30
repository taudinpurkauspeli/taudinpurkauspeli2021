module.exports = (sequelize, Sequelize) => {
// In previous version this table was called "task"
  const Procedure = sequelize.define('procedure', {
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

  return Procedure;
};
