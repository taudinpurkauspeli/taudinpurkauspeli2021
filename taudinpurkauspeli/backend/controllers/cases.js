const caseRouter = require('express').Router();
const db = require('../models');

const Case = db.cases;
const { Op } = db.Sequelize;

// Save a new case
caseRouter.post('/', (req, res) => {
  // Validate request - title
  if (!req.body.title) {
    res.status(400).send({
      message: 'The case has to have a name!',
    });
    return;
  }

  // Create a case
  const case1 = {
    title: req.body.title,
    hidden: req.body.hidden,
    anamnesis: req.body.anamnesis,
  };

  // Save case in the database
  Case.create(case1)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Unknown error occurred while creating the case. Try again.',
      });
    });
});

// Retrieve all cases
caseRouter.get('/', (req, res) => {
  const { title } = req.query;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Case.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Unknown error occurred while retrieving cases. Try again.',
      });
    });
});

// Find a single case (by id)
caseRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  Case.findByPk(id)
    .then((data) => {
      res.send(data);
    })
  // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving case with id=${id}`,
      });
    });
});

// Update a disease (by id)
caseRouter.put('/:id', (req, res) => {
  const { id } = req.params;

  Case.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'Case was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update case with id=${id}. Possible causes: case title wrong or case not found!`,
        });
      }
    })
  // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      res.status(500).send({
        message: `Error updating case with id=${id}`,
      });
    });
});

// Delete a case (by id)
caseRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  Case.destroy({
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'Case was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete case with id=${id}. Possible causes: case title wrong or case not found!`,
        });
      }
    })
  // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete case with id=${id}`,
      });
    });
});

// Delete all cases
caseRouter.delete('/', (req, res) => {
  Case.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} cases were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
              err.message || 'Some error occurred while removing all cases.',
      });
    });
});

module.exports = caseRouter;
