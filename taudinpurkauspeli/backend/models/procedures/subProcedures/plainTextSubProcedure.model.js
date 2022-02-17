module.exports = (sequelize, Sequelize) => {
  const PlainTextSubProcedure = sequelize.define('plainTextSubProcedure', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'plain_text_sub_procedures',
  });

  return PlainTextSubProcedure;
};
