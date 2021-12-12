/* eslint-disable consistent-return */
const textSubProcedureRouter = require('express').Router();
const db = require('../../models');
const helper = require('../../utils/token');

const TextSubProcedure = db.textSubProcedures;
const SubProcedure = db.subProcedures;
const ProcedureUnderCase = db.proceduresUnderCases;
const { Op } = db.Sequelize;

SubProcedure.belongsToMany(ProcedureUnderCase, { through: TextSubProcedure });
ProcedureUnderCase.belongsToMany(SubProcedure, { through: TextSubProcedure });

// Save a new sub procedure under case
textSubProcedureRouter.post('/', (req, res, next) => {
  const decodedToken = helper.tokenCheck(req, res);
  if (decodedToken.affiliation !== 'faculty') {
    return res.status(401).json({ error: 'you do not have rights to do this action' });
  }

  // Create a sub procedure under case
  const textSubProcedure = {
    subProcedureId: req.body.subProcedureId,
    proceduresUnderCaseProcedureCaseId: req.body.proceduresUnderCaseProcedureCaseId,
    title: req.body.title,
    text: req.body.text,
  };

  // Save sub procedure under case in the database
  TextSubProcedure.create(textSubProcedure)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => next(error));
});

// Retrieve all sub procedures
textSubProcedureRouter.get('/', (req, res, next) => {
  helper.tokenCheck(req, res);

  const { subProcedureId } = req.params;
  const condition = subProcedureId ? { subProcedureId: { [Op.iLike]: `%${subProcedureId}%` } } : null;

  TextSubProcedure.findAll({ where: condition })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error));
});

// Update a sub procedure (by id)
textSubProcedureRouter.put('/:id', (req, res, next) => {
  const decodedToken = helper.tokenCheck(req, res);
  if (decodedToken.affiliation !== 'faculty') {
    return res.status(401).json({ error: 'you do not have rights to do this action' });
  }

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
