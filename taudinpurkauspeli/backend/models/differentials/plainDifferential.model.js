module.exports = (sequelize, Sequelize) => {
  const PlainDifferential = sequelize.define('plainDifferential', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'plain_differentials',
    timestamps: false,
  });

  return PlainDifferential;
};
