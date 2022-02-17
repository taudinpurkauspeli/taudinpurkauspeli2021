module.exports = (sequelize, Sequelize) => {
  const PlainOption = sequelize.define('plainOption', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'plain_options',
    timestamps: false,
  });

  return PlainOption;
};
