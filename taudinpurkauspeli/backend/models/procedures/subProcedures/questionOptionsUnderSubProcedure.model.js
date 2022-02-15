module.exports = (sequelize, Sequelize) => {
  const QuestionOptionsUnderSubProcedure = sequelize.define('questionOptionsUnderSubProcedure', {
    plainSubProcedureId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'plainSubProcedures',
        key: 'id',
      },
    },
    plainOptionId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'plainOptions',
        key: 'id',
      },
    },
    isCorrect: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  }, {
    tableName: 'question_options_under_sub_procedures',
  });

  return QuestionOptionsUnderSubProcedure;
};
