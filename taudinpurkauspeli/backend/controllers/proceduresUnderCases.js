const proceduresUnderCasesRouter = require('express').Router();
const db = require('../models');

const ProcedureUnderCase = db.proceduresUnderCases;
const Procedure = db.procedures;
const Case = db.cases;
const { Op } = db.Sequelize;

Procedure.belongsToMany(Case, { through: ProcedureUnderCase });
Case.belongsToMany(Procedure, { through: ProcedureUnderCase });

// Save a new procedure under case
proceduresUnderCasesRouter.post('/', (req, res) => {
  /* Validate request - title
  if (!req.body.title) {
    res.status(400).send({
      message: 'The case has to have a name!',
    });
    return;
  }
  */

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
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Unknown error occurred while adding the procedure under the case. Try again.',
      });
    });
});

// Retrieve all procedures
proceduresUnderCasesRouter.get('/', (req, res) => {
  const { caseId } = req.params;
  const condition = caseId ? { caseId: { [Op.iLike]: `%${caseId}%` } } : null;

  ProcedureUnderCase.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Unknown error occurred while retrieving procedures under case. Try again.',
      });
    });
});

module.exports = proceduresUnderCasesRouter;