// connection to database

const Sequelize = require('sequelize');
const dbConfig = require('../utils/config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cases = require('./case.model')(sequelize, Sequelize);
db.differentials = require('./differential.model')(sequelize, Sequelize);
db.differentalsUnderCases = require('./differentialsUnderCase.model')(sequelize, Sequelize);
db.procedures = require('./procedure.model')(sequelize, Sequelize);
db.proceduresUnderCases = require('./proceduresUnderCase.model')(sequelize, Sequelize);

module.exports = db;
