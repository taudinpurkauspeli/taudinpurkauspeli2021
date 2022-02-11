module.exports = (sequelize, Sequelize) => {
  const PlainProcedure = sequelize.define('plainProcedure', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'plain_procedures',
    timestamps: false,
  });

  return PlainProcedure;
};
