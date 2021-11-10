const diseaseRouter = require('express').Router();
const db = require('../models');

const Disease = db.diseases;
const { Op } = db.Sequelize;

// Save a new disease
diseaseRouter.post('/', (req, res, next) => {
  // Create a disease
  const disease = {
    name: req.body.name,
  }
  // Save disease in the database
  Disease.create(disease)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error))
});

// Retrieve all diseases
diseaseRouter.get('/', (req, res) => {
  const { title } = req.query;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Disease.findAll({ where: condition })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error))
});

// Find a single case (by id)
diseaseRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  Disease.findByPk(id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error))
});

// Update a disease (by id)
diseaseRouter.put('/:id', (req, res, next) => {
  const { id } = req.params;

  Disease.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (Number(num) === 1) {
        res.send({
          message: 'Disease was updated successfully.',
        });
      } 
    })
    .catch((error) => next(error))
});

// Delete a disease (by id)
diseaseRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  Disease.destroy({
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

// Delete all cases
diseaseRouter.delete('/', (req, res) => {
  Disease.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.status(204).end()
    })
    .catch((error) => next(error))
});

module.exports = diseaseRouter;
