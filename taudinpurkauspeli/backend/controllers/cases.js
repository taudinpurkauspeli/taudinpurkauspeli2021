/* eslint-disable consistent-return */
const caseRouter = require('express').Router();
const db = require('../models');
const helper = require('../utils/token');

const Case = db.cases;
const { Op } = db.Sequelize;

// Save a new case
caseRouter.post('/', (req, res, next) => {
  // Create a case
  const decodedToken = helper.tokenCheck(req, res);
  if (decodedToken.affiliation !== 'faculty') {
    return res.status(401).json({ error: 'you do not have rights to do this action' });
  }

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
    .catch((error) => next(error));
});

// Retrieve all cases
caseRouter.get('/', async (req, res, next) => {
  const { title } = req.query;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  const cases = await Case.findAll({ where: condition });
  const user = await helper.createUser(req);

  try {
    res
      .status(200)
      .send({
        user, cases,
      });
  } catch (error) {
    next(error);
  }
});

// Find a single case (by id)
caseRouter.get('/:id', (req, res, next) => {
  helper.tokenCheck(req, res);
  const { id } = req.params;

  Case.findByPk(id)
    .then((data) => {
      if (data === null) {
        res.send(404).end();
      }
      res.json(data);
    })
    .catch((error) => next(error));
});

// Update a case (by id)
caseRouter.put('/:id', (req, res, next) => {
  const decodedToken = helper.tokenCheck(req, res);
  if (decodedToken.affiliation !== 'faculty') {
    return res.status(401).json({ error: 'you do not have rights to do this action' });
  }

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
    .catch((error) => next(error));
});

// Delete a case (by id)
caseRouter.delete('/:id', (req, res, next) => {
  const decodedToken = helper.tokenCheck(req, res);
  if (decodedToken.affiliation !== 'faculty') {
    return res.status(401).json({ error: 'you do not have rights to do this action' });
  }

  const { id } = req.params;

  Case.destroy({
    where: { id },
  })
    .then((num) => {
      if (Number(num) === 1) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Delete all cases
caseRouter.delete('/', (req, res, next) => {
  const decodedToken = helper.tokenCheck(req, res);
  if (decodedToken.affiliation !== 'faculty') {
    return res.status(401).json({ error: 'you do not have rights to do this action' });
  }

  Case.destroy({
    where: {},
    truncate: false,
  })
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = caseRouter;
