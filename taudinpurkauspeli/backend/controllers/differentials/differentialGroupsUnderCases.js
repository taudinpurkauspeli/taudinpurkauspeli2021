/* eslint-disable consistent-return */
const differentialGroupsUnderCasesRouter = require('express').Router();
const db = require('../../models');
const middleware = require('../../utils/middleware');

const DifferentialGroupUnderCase = db.differentialGroupsUnderCases;
const DifferentialGroups = db.differentialGroups;

// Create differentialgroup under case
differentialGroupsUnderCasesRouter.post('/:language', middleware.checkAdminRights, async (req, res) => {
  const { language } = req.params;
  const newObject = {
    plainCaseId: req.body.caseId,
    plainDifferentialGroupId: req.body.differentialGroupId,
  };

  const savedDuc = await DifferentialGroupUnderCase.create(newObject);
  const response = await DifferentialGroups.findOne({
    where: {
      plainDifferentialGroupId: savedDuc.plainDifferentialGroupId,
      language,
    },
  });

  res.send({
    diffGroupCaseId: savedDuc.id,
    id: response.plainDifferentialGroupId,
    name: response.name,
  });
});

// Retrieve all groups associated to a specific case
differentialGroupsUnderCasesRouter.get('/:id/:language', middleware.checkUserRights, async (req, res) => {
  const { id, language } = req.params;

  const foundDifferentialGroups = await db.sequelize.query(
    `SELECT duc.id AS "diffGroupCaseId", dg."plainDifferentialGroupId" AS id, dg.name
    FROM differential_groups_under_cases AS duc
    LEFT JOIN differential_groups AS dg ON duc."plainDifferentialGroupId" = dg."plainDifferentialGroupId"
    WHERE duc."plainCaseId" = ? AND dg.language = ?;
    `,
    {
      replacements: [id, language],
      type: db.sequelize.QueryTypes.SELECT,
    },
  );

  res.send(foundDifferentialGroups);
});

// Delete a differentialgroup from case
differentialGroupsUnderCasesRouter.delete('/:id', middleware.checkAdminRights, async (req, res) => {
  const { id } = req.params;

  const deletedDifferentialGroupUnderCase = await DifferentialGroupUnderCase.destroy({
    where: { id },
  });

  if (Number(deletedDifferentialGroupUnderCase) === 1) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = differentialGroupsUnderCasesRouter;
