/* eslint-disable consistent-return */
const differentialsUnderCasesRouter = require('express').Router();
const db = require('../../models');
const middleware = require('../../utils/middleware');

const DifferentialUnderCase = db.differentalsUnderCases;
const Differentials = db.differentials;
const PlainDescriptions = db.plainDescriptions;
const Descriptions = db.descriptions;

// Create differential under case
differentialsUnderCasesRouter.post('/:language', middleware.checkAdminRights, async (req, res) => {
  const { language } = req.params;
  const {
    diffGroupCaseId, differentialId, description,
  } = req.body;

  const savedPlainDescription = await PlainDescriptions.create({});

  const newDescription = {
    language,
    isDefault: language === 'fi',
    description,
    plainDescriptionId: savedPlainDescription.id,
  };

  const savedDescription = await Descriptions.create(newDescription);

  const duc = {
    differentialGroupsUnderCaseId: diffGroupCaseId,
    plainDifferentialId: differentialId,
    plainDescriptionId: savedPlainDescription.id,
  };

  const savedDuc = await DifferentialUnderCase.create(duc);
  const response = await Differentials.findOne({
    where: {
      plainDifferentialId: savedDuc.plainDifferentialId,
      language,
    },
  });

  res.send({
    diffGroupCaseId: savedDuc.differentialGroupsUnderCaseId,
    id: response.plainDifferentialId,
    description: savedDescription.description,
    name: response.name,
  });
});

// Retrieve all differentials
differentialsUnderCasesRouter.get('/:id/:language', middleware.checkUserRights, async (req, res) => {
  const { id, language } = req.params;

  const foundDifferentials = await db.sequelize.query(
    `SELECT duc."differentialGroupsUnderCaseId" AS "diffGroupCaseId", duc."plainDifferentialId" AS id, des.description, d.name
    FROM differential_groups_under_cases AS dguc
    LEFT JOIN differentials_under_cases AS duc ON dguc.id = duc."differentialGroupsUnderCaseId"
    LEFT JOIN differentials AS d ON duc."plainDifferentialId" = d."plainDifferentialId"
    LEFT JOIN descriptions AS des ON duc."plainDescriptionId" = des."plainDescriptionId"
    WHERE dguc."plainCaseId" = ? AND des.language = ? AND d.language = ?`,
    {
      replacements: [id, language, language],
      type: db.sequelize.QueryTypes.SELECT,
    },
  );

  res.send(foundDifferentials);
});

// Update differential (description, name update coming)
differentialsUnderCasesRouter.put('/:id/:language', middleware.checkAdminRights, async (req, res) => {
  const { id, language } = req.params;
  const { description } = req.body;

  const toBeUpdated = await DifferentialUnderCase.findOne({
    where: { plainDifferentialId: id },
  });

  await Descriptions.update({ description },
    { where: { plainDescriptionId: toBeUpdated.plainDescriptionId, language } });

  res.send({
    message: 'Differential description was updated successfully.',
  });
});

module.exports = differentialsUnderCasesRouter;
