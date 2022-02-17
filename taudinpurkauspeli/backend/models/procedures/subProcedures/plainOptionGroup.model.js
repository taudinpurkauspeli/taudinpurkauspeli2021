module.exports = (sequelize, Sequelize) => {
  const PlainOptionGroup = sequelize.define('plainOptionGroup', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'plain_option_groups',
    timestamps: false,
  });

  return PlainOptionGroup;
};