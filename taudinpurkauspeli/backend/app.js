const express = require('express');
require('express-async-errors');

const app = express();
const cors = require('cors');
const sequelize_fixtures = require('sequelize-fixtures');
const models = require('./models');

const userRouter = require('./controllers/users');
const caseRouter = require('./controllers/cases');
const differentialGroupRouter = require('./controllers/differentials/differentialGroups');
const differentialGroupsUnderCaseRouter = require('./controllers/differentials/differentialGroupsUnderCases');
const differentialRouter = require('./controllers/differentials/differentials');
const differentialUnderCaseRouter = require('./controllers/differentials/differentialsUnderCases');
const proceduresRouter = require('./controllers/procedures/procedures');
const proceduresUnderCasesRouter = require('./controllers/procedures/proceduresUnderCases');
const subProceduresRouter = require('./controllers/procedures/subProcedures');
const textSubProcedureRouter = require('./controllers/procedures/textSubProcedure');

const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const db = require('./models');

// Huom! No forced synchronization,
// make sure you either don't have the tables/databases,
// or that they are correct. May be able to alter them, but...

const fixtures = [
  {
    model: 'subProcedureTypes',
    data: {
      type: 'TEXT',
    },
  },
  {
    model: 'subProcedureTypes',
    data: {
      type: 'QUESTION',
    },
  },
  {
    model: 'subProcedureTypes',
    data: {
      type: 'THINKING',
    },
  },
];

db.sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection to database has been established successfully');
  })
  .catch((error) => {
    logger.error('Unable to connect to the database:', error.message);
  });

if (process.env.NODE_ENV !== 'test') {
  db.sequelize
    .sync({ alter: true })
    .then(() => {
      sequelize_fixtures.loadFixtures(fixtures, models).then(() => {
        logger.info('altered the tables');
      });
    });
}

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(middleware.requestLogger);
app.use(middleware.extractToken);
app.use(middleware.extractDecodedToken);

app.use('/api/users', userRouter);
app.use('/api/cases', caseRouter);
app.use('/api/differentialGroups', differentialGroupRouter);
app.use('/api/differentialGroupsUnderCases', differentialGroupsUnderCaseRouter);
app.use('/api/differentials', differentialRouter);
app.use('/api/differentialsUnderCases', differentialUnderCaseRouter);
app.use('/api/procedures', proceduresRouter);
app.use('/api/proceduresUnderCases', proceduresUnderCasesRouter);
app.use('/api/subProcedures', subProceduresRouter);
app.use('/api/textSubProcedures', textSubProcedureRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
