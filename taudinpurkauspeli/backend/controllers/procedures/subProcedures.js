/* eslint-disable consistent-return */
const subProceduresRouter = require('express').Router();
const db = require('../../models');

const SubProcedure = db.subProcedures;
const SubProcedureType = db.subProcedureTypes;
const middleware = require('../../utils/middleware');

// Save a new subprocedure
subProceduresRouter.post('/', middleware.checkAdminRights, async (req, res) => {
  const {
    priority, type, procedureCaseId,
  } = req.body;

  const subProcedureType = await SubProcedureType.findOne({
    where: {
      type,
    },
    attributes: [
      'id',
    ],
  });

  // Create a subprocedure
  const subProcedure = {
    proceduresUnderCaseId: procedureCaseId,
    subProcedureTypeId: subProcedureType.id,
    priority,
  };

  // Save subprocedure in the database
  const savedSubProcedure = await SubProcedure.create(subProcedure);

  res.json({
    id: savedSubProcedure.id,
    procedureCaseId: savedSubProcedure.proceduresUnderCaseId,
    type,
    priority: savedSubProcedure.priority,
  });
});

// Retrieve all subprocedures
subProceduresRouter.get('/:id/:language', middleware.checkUserRights, (req, res, next) => {
  const { id, language } = req.params;

  SubProcedure.findAll({
    where: { proceduresUnderCaseId: id, language },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error));
});

// Retrieve all subprocedures including textSubProcedures
subProceduresRouter.get('/:id', middleware.checkUserRights, async (req, res) => {
  const { id } = req.params;

  const foundSubProcedures = await db.sequelize.query(
    `SELECT tsp."plainTextSubProcedureId" AS id, sp."proceduresUnderCaseId" AS "procedureCaseId", spt.type, sp.priority, tsp.title, tsp.text
    FROM procedures_under_cases AS puc
    LEFT JOIN sub_procedures AS sp ON sp."proceduresUnderCaseId" = puc.id
    LEFT JOIN sub_procedure_types AS spt ON spt.id = sp."subProcedureTypeId"
    LEFT JOIN plain_text_sub_procedures AS pspt ON pspt."subProcedureId" = sp.id
    LEFT JOIN text_sub_procedures AS tsp ON tsp."plainTextSubProcedureId" = pspt.id
    WHERE puc."plainCaseId" = ?`,
    {
      replacements: [id],
      type: db.sequelize.QueryTypes.SELECT,
    },
  );

  res.send(foundSubProcedures);
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
