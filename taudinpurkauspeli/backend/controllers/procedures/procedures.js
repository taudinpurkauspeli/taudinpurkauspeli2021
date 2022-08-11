/* eslint-disable consistent-return */
const proceduresRouter = require('express').Router();
const db = require('../../models');
const middleware = require('../../utils/middleware');

const Procedure = db.procedures;
const PlainProcedure = db.plainProcedures;

// Save a new procedure
proceduresRouter.post('/:language', middleware.checkAdminRights, async (req, res, next) => {
  const { language } = req.params;
  let { id } = req.body;
  const { name } = req.body;

  if (id === undefined) {
    const newPlainProcedure = await PlainProcedure.create({});
    id = newPlainProcedure.id;
  }

  const newProcedure = {
    plainProcedureId: id,
    language,
    isDefault: language === 'fi',
    name,
  };

  // Save procedure in the database
  const savedProcedure = await Procedure.findOrCreate({
    where: newProcedure,
    defaults: newProcedure,
  });

  res.json({
    id: savedProcedure[0].plainProcedureId,
    name: savedProcedure[0].name,
  });
});

// Retrieve all procedures
proceduresRouter.get('/:language', middleware.checkUserRights, async (req, res) => {
  const { language } = req.params;

  const foundProcedures = await Procedure.findAll({
    where: { language },
    include: {
      model: PlainProcedure,
      attributes: [],
    },
    attributes: [
      ['plainProcedureId', 'id'],
      'name',
    ],
  });

  res.json(foundProcedures);
});

// Update a procedure (by id)
proceduresRouter.put('/:id/:language', middleware.checkAdminRights, async (req, res) => {
  const { id, language } = req.params;
  const { name } = req.body;

  await Procedure.update({ name }, {
    where: { plainProcedureId: id, language },
  });

  res.send({
    message: 'Procedure was updated successfully.',
  });
});

proceduresRouter.delete('/:id', middleware.checkAdminRights, async (req, res, next) => {
  const { id } = req.params;

  await Procedure.destroy({
    where: { plainProcedureId: id },
  });
  const deletedPlainProcedure = await PlainProcedure.destroy({
    where: { id },
  });

  if (Number(deletedPlainProcedure) === 1) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = proceduresRouter;
