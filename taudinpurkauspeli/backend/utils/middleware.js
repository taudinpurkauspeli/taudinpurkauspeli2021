const jwt = require('jsonwebtoken');
/* eslint-disable consistent-return */
const logger = require('./logger');
const config = require('./config');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// request.token undefined when GET api/cases
const extractToken = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }

  next();
};

const extractDecodedToken = (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, config.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token is invalid' });
    }
    request.decodedToken = decodedToken;
  }

  if (process.env.NODE_ENV === 'test') {
    request.decodedToken = { affiliation: 'faculty' };
  }

  next();
};

const checkUserRights = (request, response, next) => {
  if (!request.decodedToken) {
    return response.status(401).json({ error: 'you do not have rights to view this page' });
  }
  next();
};

const checkAdminRights = (request, response, next) => {
  if (!request.decodedToken || request.decodedToken.affiliation !== 'faculty') {
    return response.status(401).json({ error: 'you do not have rights to do this action' });
  }
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  extractToken,
  extractDecodedToken,
  checkUserRights,
  checkAdminRights,
};
