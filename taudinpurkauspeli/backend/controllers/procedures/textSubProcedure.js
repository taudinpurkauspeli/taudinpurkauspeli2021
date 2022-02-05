/* eslint-disable consistent-return */
const textSubProcedureRouter = require('express').Router();
const db = require('../../models');
const middleware = require('../../utils/middleware');

const TextSubProcedure = db.textSubProcedures;
const PlainTextSubProcedure = db.plainTextSubProcedures;
const { Op } = db.Sequelize;

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
textSubProcedureRouter.get('/', middleware.checkUserRights, (req, res, next) => {
  const { subProcedureId } = req.params;
  const condition = subProcedureId ? { subProcedureId: { [Op.iLike]: `%${subProcedureId}%` } } : null;

  TextSubProcedure.findAll({ where: condition })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error));
});

// Update a sub procedure (by id)
textSubProcedureRouter.put('/:id', middleware.checkAdminRights, (req, res, next) => {
  const { id } = req.params;

  TextSubProcedure.update(req.body, {
    where: { subProcedureId: id },
  })
    .then((num) => {
      if (Number(num) === 1) {
        res.send({
          message: 'Sub procedure was updated successfully.',
        });
      }
    })
    .catch((error) => next(error));
});

module.exports = textSubProcedureRouter;
