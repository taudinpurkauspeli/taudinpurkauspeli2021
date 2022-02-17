module.exports = (sequelize, Sequelize) => {
  const PlainDescription = sequelize.define('plainDescription', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'plain_descriptions',
    timestamps: false,
  });

  return PlainDescription;
};