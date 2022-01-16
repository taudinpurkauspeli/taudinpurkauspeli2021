/* eslint-disable consistent-return */
const proceduresUnderCasesRouter = require('express').Router();
const db = require('../../models');

const ProcedureUnderCase = db.proceduresUnderCases;
const Procedure = db.procedures;
const Case = db.cases;
const middleware = require('../../utils/middleware');

const { Op } = db.Sequelize;

Procedure.belongsToMany(Case, { through: ProcedureUnderCase });
Case.belongsToMany(Procedure, { through: ProcedureUnderCase });

// Save a new procedure under case
proceduresUnderCasesRouter.post('/', middleware.checkAdminRights, (req, res, next) => {
  // Create a procedure under case
  const procedureUnderCase = {
    caseId: req.body.caseId,
    procedureId: req.body.procedureId,
    priority: req.body.priority,
  };

  // Save procedure under case in the database
  ProcedureUnderCase.create(procedureUnderCase)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => next(error));
});

// Retrieve all procedures related to case based on id
proceduresUnderCasesRouter.get('/:id', middleware.checkUserRights, (req, res, next) => {
  const { id } = req.params;

  ProcedureUnderCase.findAll({
    where: {
      caseId: id,
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error));
});

// Retrieve all procedures
proceduresUnderCasesRouter.get('/', middleware.checkUserRights, (req, res, next) => {
  const { caseId } = req.params;
  const condition = caseId ? { caseId: { [Op.iLike]: `%${caseId}%` } } : null;

  ProcedureUnderCase.findAll({ where: condition })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error));
});

// Update a procedure (by id)
proceduresUnderCasesRouter.put('/:id', middleware.checkAdminRights, (req, res, next) => {
  const { id } = req.params;

  ProcedureUnderCase.update(req.body, {
    where: { procedureId: id, caseId: req.body.caseId },
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

module.exports = proceduresUnderCasesRouter;
