/* eslint-disable consistent-return */
const differentialsUnderCasesRouter = require('express').Router();
const db = require('../../models');
const middleware = require('../../utils/middleware');

const DifferentialUnderCase = db.differentalsUnderCases;

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

  const savedDuc = DifferentialUnderCase.create(duc);

  res.send(savedDuc);
});

// Retrieve all differentials
differentialsUnderCasesRouter.get('/:id/:language', middleware.checkUserRights, async (req, res) => {
  const { id, language } = req.params;

  const foundDifferentials = await db.sequelize.query(
    `SELECT duc."plainDifferentialId" AS id, duc.description, d.name
    FROM differentials_under_cases AS duc
    LEFT JOIN differentials AS d ON duc."plainDifferentialId" = d."plainDifferentialId"
    WHERE duc."differentialGroupsUnderCaseId" = ? AND duc.language = ? AND d.language = ?`,
    {
      replacements: [id, language, language],
      type: db.sequelize.QueryTypes.SELECT,
    },
  );

  res.send(foundDifferentials);
});

module.exports = differentialsUnderCasesRouter;
