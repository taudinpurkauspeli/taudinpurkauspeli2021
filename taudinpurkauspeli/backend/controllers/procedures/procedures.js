/* eslint-disable consistent-return */
const proceduresRouter = require('express').Router();
const db = require('../../models');
const middleware = require('../../utils/middleware');

const Procedure = db.procedures;
const Case = db.cases;
const { Op } = db.Sequelize;

// Save a new procedure under case
proceduresRouter.post('/', middleware.checkAdminRights, (req, res, next) => {
  // Create a procedure under case
  const procedureObject = {
    title: req.body.title,
  };

  // Save procedure in the database
  Procedure.create(procedureObject)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error));
});

// Retrieve all procedures
proceduresRouter.get('/', middleware.checkUserRights, (req, res, next) => {
  const { title } = req.query;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Procedure.findAll({ where: condition })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error));
});

// Retrieve all procedures including procedure under cases
proceduresRouter.get('/:id', middleware.checkUserRights, (req, res, next) => {
  const { id } = req.params;

  Case.findOne({
    include: [{
      model: Procedure,
    }],
    where: {
      id,
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error));
});

// Update a procedure (by id)
proceduresRouter.put('/:id', middleware.checkAdminRights, (req, res, next) => {
  const { id } = req.params;

  Procedure.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (Number(num) === 1) {
        res.send({
          message: 'Procedure was updated successfully.',
        });
      }
    })
    .catch((error) => next(error));
});

module.exports = proceduresRouter;
