const differentialRouter = require('express').Router();
const db = require('../models');

const Differential = db.differentials;
const { Op } = db.Sequelize;

// Save a new differential
differentialRouter.post('/', (req, res, next) => {
  // Create a differential
  const differential = {
    name: req.body.name,
  }

  // Save differential in the database
  Differential.findOrCreate({
    where: {
      name: differential.name
    },
    defaults: {
      name: differential.name
    }
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error))
});

// Retrieve all differentials
differentialRouter.get('/', (req, res, next) => {
  const { title } = req.query;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Differential.findAll({ where: condition })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error))
});

// Find a single differential (by id)
differentialRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;

  Differential.findByPk(id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error))
});

// Update a differential (by id)
differentialRouter.put('/:id', (req, res, next) => {
  const { id } = req.params;

  Differential.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (Number(num) === 1) {
        res.send({
          message: 'differential was updated successfully.',
        });
      } 
    })
    .catch((error) => next(error))
});

// Find a single differential (by name)
differentialRouter.get('/:name', (req, res, next) => {
  const { name } = req.params;

  Differential.findOne({ where: { name: name }
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error))
  });
});

// Delete a differential (by id)
differentialRouter.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  Differential.destroy({
    where: { id },
  })
    .then((num) => {
      if (Number(num) === 1) {
        res.status(204).end()
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
});

// Delete all diffs
differentialRouter.delete('/', (req, res, next) => {
  Differential.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.status(204).end()
    })
    .catch((error) => next(error))
});

module.exports = differentialRouter;
