const diseaseRouter = require('express').Router();
const db = require('../models');

const Disease = db.diseases;
const { Op } = db.Sequelize;

// Save a new disease
diseaseRouter.post('/', (req, res) => {
  // Validate request - title
  if (!req.body.title) {
    res.status(400).send({
      message: 'The disease has to have a name!',
    });
    return;
  }

  // Create a disease
  const disease = {
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
  };

  // Save disease in the database
  Disease.create(disease)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Unknown error occurred while creating the disease. Try again.',
      });
    });
});

// Retrieve all diseases
diseaseRouter.get('/', (req, res) => {
  const { title } = req.query;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Disease.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Unknown error occurred while retrieving diseases. Try again.',
      });
    });
});

// Find a single disease (by id)
diseaseRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  Disease.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving disease with id=${id}`,
      });
    });
});

// Update a disease (by id)
diseaseRouter.put('/:id', (req, res) => {
  const { id } = req.params;

  Disease.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'Disease was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update disease with id=${id}. Possible causes: disease title wrong or disease not found!`,
        });
      }
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      res.status(500).send({
        message: `Error updating disease with id=${id}`,
      });
    });
});

// Delete a disease (by id)
diseaseRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  Disease.destroy({
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'Disease was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete disease with id=${id}. Possible causes: disease title wrong or disease not found!`,
        });
      }
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete disease with id=${id}`,
      });
    });
});

// Delete all diseases
diseaseRouter.delete('/', (req, res) => {
  Disease.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} diseases were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Some error occurred while removing all diseases.',
      });
    });
});

// Find all spesified type of diseases
diseaseRouter.get('/category', (req, res) => {
  // eslint-disable-next-line no-undef
  Disease.findAll({ where: { category } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Some error occurred while retrieving diseases.',
      });
    });
});

module.exports = diseaseRouter;