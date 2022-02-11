/* eslint-disable consistent-return */
const textSubProcedureRouter = require('express').Router();
const db = require('../../models');
const middleware = require('../../utils/middleware');

const TextSubProcedure = db.textSubProcedures;
const PlainTextSubProcedure = db.plainTextSubProcedures;

// Save a new sub procedure under case
textSubProcedureRouter.post('/:language', middleware.checkAdminRights, async (req, res) => {
  const { language } = req.params;
  const {
    subProcedureId, title, text,
  } = req.body;

  const savedPlainTsp = await PlainTextSubProcedure
    .create({
      subProcedureId,
    });

  const textSubProcedure = {
    plainTextSubProcedureId: savedPlainTsp.id,
    language,
    isDefault: language === 'fi',
    title,
    text,
  };

  const savedTsp = await TextSubProcedure.create(textSubProcedure);

  res.send({
    id: savedTsp.plainTextSubProcedureId,
    title: savedTsp.title,
    text: savedTsp.text,
  });
});

// Retrieve all sub procedures
textSubProcedureRouter.get('/:language', middleware.checkUserRights, async (req, res) => {
  const { language } = req.params;

  const foundTSP = await TextSubProcedure.findAll({ where: { language } });

  res.json(foundTSP);
});

// Update a sub procedure (by id)
textSubProcedureRouter.put('/:id/:language', middleware.checkAdminRights, async (req, res) => {
  const { id, language } = req.params;

  await TextSubProcedure.update(req.body, {
    where: {
      plainTextSubProcedureId: id, language,
    },
  });

  res.send({
    message: 'Sub procedure was updated successfully.',
  });
});

module.exports = textSubProcedureRouter;
