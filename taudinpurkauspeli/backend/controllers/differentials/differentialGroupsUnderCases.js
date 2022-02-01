/* eslint-disable consistent-return */
const differentialGroupsUnderCasesRouter = require('express').Router();
const db = require('../../models');
const middleware = require('../../utils/middleware');

const DifferentialGroupUnderCase = db.differentialGroupsUnderCases;

// Create differentialgroup under case
differentialGroupsUnderCasesRouter.post('/', middleware.checkAdminRights, async (req, res) => {
  const newObject = {
    plainCaseId: req.body.caseId,
    plainDifferentialGroupId: req.body.differentialGroupId,
  };

  const savedDuc = DifferentialGroupUnderCase.create(newObject);

  res.send(savedDuc);
});

// Retrieve all groups associated to a specific case
differentialGroupsUnderCasesRouter.get('/:id/:language', middleware.checkUserRights, async (req, res) => {
  const { id, language } = req.params;

  /*
  const foundDifferentialGroups = await PlainCase.findOne({
    where: {
      id,
    },
    include: {
      model: PlainDifferentialGroup,
    },
    attributes: {
      include: [
        [
          db.sequelize.literal(`(
                    SELECT name
                    FROM differential_groups AS diffgroup
                    WHERE diffgroup."plainDifferentialGroupId" = "plainDifferentialGroups".id
                )`),
          'name',
        ],
      ],
    },
  });
  */

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

module.exports = differentialGroupsUnderCasesRouter;
