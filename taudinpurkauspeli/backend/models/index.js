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
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.plainCases = require('./plainCase.model')(sequelize, Sequelize);
db.plainDifferentials = require('./differentials/plainDifferential.model')(sequelize, Sequelize);
db.plainDifferentialGroups = require('./differentials/plainDifferentialGroup.model')(sequelize, Sequelize);

db.users = require('./user.model')(sequelize, Sequelize);
db.cases = require('./case.model')(sequelize, Sequelize);
db.differentialGroups = require('./differentials/differentialGroup.model')(sequelize, Sequelize);
db.differentialGroupsUnderCases = require('./differentials/differentialGroupsUnderCase.model')(sequelize, Sequelize);
db.differentials = require('./differentials/differential.model')(sequelize, Sequelize);
db.differentalsUnderCases = require('./differentials/differentialsUnderCase.model')(sequelize, Sequelize);
db.procedures = require('./procedures/procedure.model')(sequelize, Sequelize);
db.proceduresUnderCases = require('./procedures/proceduresUnderCase.model')(sequelize, Sequelize);
db.subProcedures = require('./procedures/subProcedure.model')(sequelize, Sequelize);
db.textSubProcedures = require('./procedures/textSubProcedure.model')(sequelize, Sequelize);

db.plainCases.hasMany(db.cases);
db.cases.belongsTo(db.plainCases, {
  foreignKey: 'plainCaseId',
  constraints: false,
});

db.plainDifferentials.hasMany(db.differentials);
db.differentials.belongsTo(db.plainDifferentials, {
  foreignKey: 'plainDifferentialId',
  constraints: false,
});

db.plainDifferentialGroups.hasMany(db.differentialGroups);
db.differentialGroups.belongsTo(db.plainDifferentialGroups, {
  foreignKey: 'plainDifferentialGroupId',
  constraints: false,
});

db.cases.belongsToMany(db.differentialGroups, { through: db.differentialGroupsUnderCases });
db.differentialGroups.belongsToMany(db.cases, { through: db.differentialGroupsUnderCases });

db.procedures.belongsToMany(db.cases, { through: db.proceduresUnderCases });
db.cases.belongsToMany(db.procedures, { through: db.proceduresUnderCases });

db.subProcedures.hasMany(db.textSubProcedures);
db.textSubProcedures.belongsTo(db.subProcedures, {
  as: 'subProcedure',
  foreignKey: 'subProcedureId',
  constraints: false,
});

db.proceduresUnderCases.hasMany(db.subProcedures);
db.subProcedures.belongsTo(db.proceduresUnderCases, {
  as: 'proceduresUnderCase',
  foreignKey: 'proceduresUnderCaseId',
  constraints: false,
});

module.exports = db;
