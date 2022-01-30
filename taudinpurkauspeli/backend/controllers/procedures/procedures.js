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
    isDefault: language === 'fin',
    name,
  };

  // Save procedure in the database
  const savedProcedure = await Procedure.findOrCreate({
    where: newProcedure,
    defaults: newProcedure,
  });

  res.json({
    id: savedProcedure.plainProcedureId,
    name: savedProcedure.name,
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
      'name',
      ['plainProcedureId', 'id'],
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

module.exports = proceduresRouter;
