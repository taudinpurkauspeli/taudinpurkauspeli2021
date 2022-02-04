/* eslint-disable consistent-return */
const subProceduresRouter = require('express').Router();
const db = require('../../models');

const PlainSubProcedure = db.plainSubProcedures;
const SubProcedure = db.subProcedures;
const ProcedureUnderCase = db.proceduresUnderCases;
const middleware = require('../../utils/middleware');

// Save a new subprocedure
subProceduresRouter.post('/:language', middleware.checkAdminRights, async (req, res) => {
  const { language } = req.params;
  let { id } = req.body;
  const {
    priority, type, proceduresUnderCaseId,
  } = req.body;

  if (id === undefined) {
    const newPlainSubProcedure = await PlainSubProcedure.create({ priority });
    id = newPlainSubProcedure.id;
  }

  // Create a subprocedure
  const subProcedure = {
    plainSubProcedureId: id,
    language,
    isDefault: language === 'fin',
    proceduresUnderCaseId,
    type,
  };

  // Save subprocedure in the database
  const savedSubProcedure = await SubProcedure.create(subProcedure);

  res.json({
    id: savedSubProcedure.plainSubProcedureId,
    proceduresUnderCaseId,
    type,
  });
});

// Retrieve all subprocedures
subProceduresRouter.get('/:id/:language', middleware.checkUserRights, (req, res, next) => {
  const { id, language } = req.params;

  SubProcedure.findAll({
    where: { plainSubProcedureId: id, language },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error));
});

// Retrieve all subprocedures including textSubProcedures
subProceduresRouter.get('/:id', middleware.checkUserRights, (req, res, next) => {
  const { id } = req.params;

  ProcedureUnderCase.findOne({
    include: [{
      model: SubProcedure,
    }],
    where: {
      procedureId: id,
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error));
});

// Update a subprocedure (by id)
subProceduresRouter.put('/:id', middleware.checkAdminRights, (req, res, next) => {
  const { id } = req.params;

  SubProcedure.update(req.body, {
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

module.exports = subProceduresRouter;
