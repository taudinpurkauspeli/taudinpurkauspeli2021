/* eslint-disable consistent-return */
const proceduresRouter = require('express').Router();
const db = require('../../models');
const middleware = require('../../utils/middleware');

const Procedure = db.procedures;
const { Op } = db.Sequelize;

// Save a new procedure under case
proceduresRouter.post('/', middleware.checkAdminRights, async (req, res, next) => {
  // Create a procedure under case

  const procedureObject = {
    title: req.body.title,
    language: req.body.language,
    isDefault: req.body.language === 'fin',
  };

  // Save procedure in the database
  const newProcedure = await Procedure.create(procedureObject)

  try {
    res.json({
      title: newProcedure.title,
    });
  } catch (error) {
    next(error);
  }
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

// Update a procedure (by id)
proceduresRouter.put('/:id', middleware.checkAdminRights, async (req, res, next) => {
  const { id } = req.params;

  try {
    await Procedure.update(req.body, {
      where: { id, language: req.body.language },
    });
    res.send({
      message: 'Procedure was updated successfully.',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = proceduresRouter;
