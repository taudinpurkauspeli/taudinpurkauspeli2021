/* eslint-disable consistent-return */
const proceduresUnderCasesRouter = require('express').Router();
const db = require('../../models');
const middleware = require('../../utils/middleware');

const ProcedureUnderCase = db.proceduresUnderCases;
const Procedure = db.procedures;

const { Op } = db.Sequelize;

// create a new procedure under case
proceduresUnderCasesRouter.post('/:language', middleware.checkAdminRights, async (req, res) => {
  const { language } = req.params;
  const procedureUnderCase = {
    plainCaseId: req.body.caseId,
    plainProcedureId: req.body.procedureId,
    priority: req.body.priority,
  };

  // Save procedure under case in the database
  const savedPuc = await ProcedureUnderCase.create(procedureUnderCase);
  const response = await Procedure.findOne({
    where: {
      plainProcedureId: savedPuc.plainProcedureId,
      language,
    },
  });

  res.send({
    id: response.plainProcedureId,
    procedureCaseId: savedPuc.id,
    name: response.name,
    priority: savedPuc.priority,
  });
});

// Retrieve all procedures related to case based on id
proceduresUnderCasesRouter.get('/:id/:language', middleware.checkUserRights, async (req, res) => {
  const { id, language } = req.params;

  const foundProcedures = await db.sequelize.query(
    `SELECT p."plainProcedureId" AS id, puc.id AS "procedureCaseId", p.name, puc.priority
    FROM procedures_under_cases AS puc
    LEFT JOIN procedures AS p ON puc."plainProcedureId" = p."plainProcedureId"
    WHERE puc."plainCaseId" = ? AND p.language = ?;
    `,
    {
      replacements: [id, language],
      type: db.sequelize.QueryTypes.SELECT,
    },
  );

  res.send(foundProcedures);
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
proceduresUnderCasesRouter.put('/:id', middleware.checkAdminRights, async (req, res) => {
  const { id } = req.params;
  const { priority } = req.body;

  await ProcedureUnderCase.update({ priority }, {
    where: { id },
  });

  res.send({
    message: 'Procedure was updated successfully.',
  });
});

// Delete a procedure from case
proceduresUnderCasesRouter.delete('/:id', middleware.checkAdminRights, async (req, res) => {
  const { id } = req.params;

  const deletedProcedureUnderCase = await ProcedureUnderCase.destroy({
    where: { plainProcedureId: id },
  });

  if (Number(deletedProcedureUnderCase) === 1) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = proceduresUnderCasesRouter;
