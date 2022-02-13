/* eslint-disable consistent-return */
const subProceduresRouter = require('express').Router();
const db = require('../../../models');
const middleware = require('../../../utils/middleware');

const SubProcedure = db.subProcedures;
const PlainSubProcedure = db.plainSubProcedures;
const TextSubProcedure = db.textSubProcedures;
const PlainTextSubProcedure = db.plainTextSubProcedures;
const SubProcedureType = db.subProcedureTypes;

const saveTextSubProcedure = async (id, content, language) => {
  const savedPlainTsp = await PlainTextSubProcedure
    .create({
      plainSubProcedureId: id,
    });

  const textSubProcedure = {
    plainTextSubProcedureId: savedPlainTsp.id,
    language,
    isDefault: language === 'fi',
    text: content.text,
  };

  const savedTsp = await TextSubProcedure.create(textSubProcedure);

  return ({
    text: savedTsp.text,
  });
};

// Save a new subprocedure
subProceduresRouter.post('/:language', middleware.checkAdminRights, async (req, res) => {
  const { language } = req.params;
  let { id } = req.body;
  const content = req.body;

  if (id === undefined) {
    const subProcedureType = await SubProcedureType.findOne({
      where: {
        type: content.type,
      },
      attributes: [
        'id',
      ],
    });

    const plainSubProcedure = {
      proceduresUnderCaseId: content.procedureCaseId,
      subProcedureTypeId: subProcedureType.id,
      priority: content.priority,
    };

    const newPlainSubProcedure = await PlainSubProcedure
      .create(plainSubProcedure);

    id = newPlainSubProcedure.id;
  }

  const newSubProcedure = {
    plainSubProcedureId: id,
    language,
    isDefault: language === 'fi',
    title: content.title,
  };

  // Save subprocedure in the database
  const savedSubProcedure = await SubProcedure.create(newSubProcedure);
  let savedTypedSubProcedure;

  switch (content.type) {
    case 'TEXT':
      savedTypedSubProcedure = await saveTextSubProcedure(id, content, language);
      break;
    default:
      res.status(404).end();
  }

  res.json({
    id: savedSubProcedure.plainSubProcedureId,
    procedureCaseId: content.procedureCaseId,
    type: content.type,
    priority: content.priority,
    title: savedSubProcedure.title,
    text: savedTypedSubProcedure.text,
  });
});

// Retrieve all textsubprocedures
subProceduresRouter.get('/:id/:language', middleware.checkUserRights, async (req, res) => {
  const { id, language } = req.params;

  const foundSubProcedures = await db.sequelize.query(
    `SELECT psp.id, psp."proceduresUnderCaseId" AS "procedureCaseId", spt.type, psp.priority, sp.title, tsp.text
    FROM procedures_under_cases AS puc
    LEFT JOIN plain_sub_procedures AS psp ON psp."proceduresUnderCaseId" = puc.id
    LEFT JOIN sub_procedure_types AS spt ON spt.id = psp."subProcedureTypeId"
    LEFT JOIN sub_procedures AS sp ON sp."plainSubProcedureId" = psp.id
    LEFT JOIN plain_text_sub_procedures AS pspt ON pspt."plainSubProcedureId" = psp.id
    LEFT JOIN text_sub_procedures AS tsp ON tsp."plainTextSubProcedureId" = pspt.id
    WHERE puc."plainCaseId" = ? AND tsp.language = ?`,
    {
      replacements: [id, language],
      type: db.sequelize.QueryTypes.SELECT,
    },
  );

  res.send(foundSubProcedures);
});

// Update a subprocedure (by id)
subProceduresRouter.put('/:id/:language', middleware.checkAdminRights, async (req, res) => {
  const { id, language } = req.params;
  const content = req.body;

  await PlainSubProcedure.update({ priority: content.priority }, {
    where: { id },
  });

  await SubProcedure.update({ title: content.title }, {
    where: {
      plainSubProcedureId: id,
      language,
    },
  });

  if (content.type === 'TEXT') {
    const TSP = await PlainTextSubProcedure.findOne({
      where: {
        plainSubProcedureId: id,
      },
    });
    await TextSubProcedure.update({ text: content.text }, {
      where: {
        id: TSP.id,
        language,
      },
    });
  }

  res.send({
    message: 'Procedure was updated successfully.',
  });
});

module.exports = subProceduresRouter;
