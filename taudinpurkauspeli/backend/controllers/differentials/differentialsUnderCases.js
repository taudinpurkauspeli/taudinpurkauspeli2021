/* eslint-disable consistent-return */
const differentialsUnderCasesRouter = require('express').Router();
const db = require('../../models');
const middleware = require('../../utils/middleware');

const DifferentialUnderCase = db.differentalsUnderCases;
const Differentials = db.differentials;

// Create differential under case
differentialsUnderCasesRouter.post('/:language', middleware.checkAdminRights, async (req, res) => {
  const { language } = req.params;
  const {
    diffGroupCaseId, differentialId, description,
  } = req.body;

  const duc = {
    differentialGroupsUnderCaseId: diffGroupCaseId,
    plainDifferentialId: differentialId,
    description,
    language,
    isDefault: language === 'fi',
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
    description: savedDuc.description,
    name: response.name,
  });
});

// Retrieve all differentials
differentialsUnderCasesRouter.get('/:id/:language', middleware.checkUserRights, async (req, res) => {
  const { id, language } = req.params;

  const foundDifferentials = await db.sequelize.query(
    `SELECT duc."differentialGroupsUnderCaseId" AS "diffGroupCaseId", duc."plainDifferentialId" AS id, duc.description, d.name
    FROM differential_groups_under_cases AS dguc
    LEFT JOIN differentials_under_cases AS duc ON dguc.id = duc."differentialGroupsUnderCaseId"
    LEFT JOIN differentials AS d ON duc."plainDifferentialId" = d."plainDifferentialId"
    WHERE dguc."plainCaseId" = ? AND duc.language = ? AND d.language = ?`,
    {
      replacements: [id, language, language],
      type: db.sequelize.QueryTypes.SELECT,
    },
  );

  res.send(foundDifferentials);
});

module.exports = differentialsUnderCasesRouter;
