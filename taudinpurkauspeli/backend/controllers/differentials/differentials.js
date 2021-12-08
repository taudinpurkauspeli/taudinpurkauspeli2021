/* eslint-disable consistent-return */
const differentialRouter = require('express').Router();
const db = require('../../models');
const helper = require('../../utils/helpers');

const Differential = db.differentials;
const { Op } = db.Sequelize;

// Save a new differential
differentialRouter.post('/', (req, res, next) => {
  const decodedToken = helper.tokenCheck(req, res);
  if (decodedToken.affiliation !== 'faculty') {
    return res.status(401).json({ error: 'you do not have rights to do this action' });
  }
  // Create a differential
  const differential = {
    name: req.body.name,
  };

  // Save differential in the database
  Differential.findOrCreate({
    where: {
      name: differential.name,
    },
    defaults: {
      name: differential.name,
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error));
});

// Retrieve all differentials
differentialRouter.get('/', (req, res, next) => {
  helper.tokenCheck(req, res);

  const { title } = req.query;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Differential.findAll({ where: condition })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error));
});

// Update a differential (by id)
differentialRouter.put('/:id', (req, res, next) => {
  const decodedToken = helper.tokenCheck(req, res);
  if (decodedToken.affiliation !== 'faculty') {
    return res.status(401).json({ error: 'you do not have rights to do this action' });
  }

  const { id } = req.params;

  Differential.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (Number(num) === 1) {
        res.send({
          message: 'Differential was updated successfully.',
        });
      }
    })
    .catch((error) => next(error));
});

module.exports = differentialRouter;
