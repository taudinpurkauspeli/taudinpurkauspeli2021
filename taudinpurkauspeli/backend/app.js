const express = require('express');
require('express-async-errors')
const app = express();
const cors = require('cors');
const differentialRouter = require('./controllers/differentials');
const caseRouter = require('./controllers/cases');
const differentialUnderCaseRouter = require('./controllers/differentialsUnderCases');
const proceduresRouter = require('./controllers/procedures');
const proceduresUnderCasesRouter = require('./controllers/proceduresUnderCases');
const subProceduresRouter = require('./controllers/subProcedures');
const textSubProcedureRouter = require('./controllers/textSubProcedure');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const db = require('./models');

// Huom! No forced synchronization,
// make sure you either don't have the tables/databases,
// or that they are correct. May be able to alter them, but...

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
    logger.info('altered the tables');
  });
}

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(middleware.requestLogger);

app.use('/api/cases', caseRouter);
app.use('/api/differentials', differentialRouter);
app.use('/api/differentialsUnderCases', differentialUnderCaseRouter);
app.use('/api/procedures', proceduresRouter);
app.use('/api/proceduresUnderCases', proceduresUnderCasesRouter);
app.use('/api/subProcedures', subProceduresRouter);
app.use('api/textSubProcedures', textSubProcedureRouter);
app.use('/api/proceduresUnderCases', proceduresUnderCasesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
