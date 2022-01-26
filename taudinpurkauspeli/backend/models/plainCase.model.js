module.exports = (sequelize, Sequelize) => {
  const PlainCase = sequelize.define('plainCase', {
    hidden: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  }, {
    tableName: 'plain_cases',
    timestamps: false,
  });

  return PlainCase;
};
