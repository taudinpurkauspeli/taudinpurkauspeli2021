const db = require('../models');

module.exports = (sequelize, Sequelize) => {
    // In previous version this table was called "exercise_hypotheses"
    
    const DifferentialsUnderCase = sequelize.define('differentialsUnderCase', {
        caseId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'cases',
                key: 'id'
            }
        },
        differentialId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'differentials',
              key: 'id'
            }
          },
        description: {
            type: Sequelize.TEXT,
        }
      });
    
      return DifferentialsUnderCase;
    };
    