module.exports = (sequelize, Sequelize) => {
  const PlainDifferentialGroup = sequelize.define('plainDifferentialGroup', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'plain_differential_groups',
    timestamps: false,
  });

  return PlainDifferentialGroup;
};
