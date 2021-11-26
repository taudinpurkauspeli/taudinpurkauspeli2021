const caseRouter = require('express').Router();
const db = require('../models');

const Case = db.cases;
const { Op } = db.Sequelize;

// Save a new case
caseRouter.post('/', (req, res, next) => {
  // Create a case
  const case1 = {
    title: req.body.title,
    hidden: req.body.hidden,
    anamnesis: req.body.anamnesis,
  };

  // Save case in the database
  Case.create(case1)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error))
});

// Retrieve all cases
caseRouter.get('/', (req, res, next) => {
  console.log('Headers from backend', req.headers);
  const { title } = req.query;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Case.findAll({ where: condition })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error))
});

// Find a single case (by id)
caseRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;

  Case.findByPk(id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error))
});

// Update a disease (by id)
caseRouter.put('/:id', (req, res, next) => {
  const { id } = req.params;

  Case.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (Number(num) === 1) {
        res.send({
          message: 'Case was updated successfully.',
        });
      } 
    })
    .catch((error) => next(error))
});

// Delete a case (by id)
caseRouter.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  Case.destroy({
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
caseRouter.delete('/', (req, res, next) => {
  Case.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.status(204).end()
    })
    .catch((error) => next(error))
});

module.exports = caseRouter;
