/* eslint-disable consistent-return */
const optionGroupsUnderSubProceduresRouter = require('express').Router();
const db = require('../../../models');
const middleware = require('../../../utils/middleware');

const OptionGroupsUnderSubProcedures = db.optionGroupsUnderSubProcedures;
const OptionGroups = db.optionGroups;

optionGroupsUnderSubProceduresRouter.post('/:language', middleware.checkAdminRights, async (req, res) => {
  const { language } = req.params;
  const newObject = {
    plainSubProcedureId: req.body.procedureId,
    plainOptionGroupId: req.body.optionGroupId,
  };

  const savedOuc = await OptionGroupsUnderSubProcedures.create(newObject);
  const response = await OptionGroups.findOne({
    where: {
      plainOptionGroupId: savedOuc.plainOptionGroupId,
      language,
    },
  });

  res.send({
    optionGroupSubProcedureId: savedOuc.id,
    id: response.plainOptionGroupId,
    name: response.name,
  });
});

// Retrieve all groups associated to a specific subprocedure
optionGroupsUnderSubProceduresRouter.get('/:id/:language', middleware.checkUserRights, async (req, res) => {
  const { id, language } = req.params;

  const foundOptionGroups = await db.sequelize.query(
    `SELECT ouc.id AS "optionGroupSubProcedureId", og."plainOptionGroupId" AS id, og.name
    FROM option_groups_under_sub_procedures AS ouc
    LEFT JOIN option_groups AS og ON ouc."plainOptionGroupId" = og."plainOptionGroupId"
    WHERE ouc."plainSubProcedureId" = ? AND og.language = ?;
    `,
    {
      replacements: [id, language],
      type: db.sequelize.QueryTypes.SELECT,
    },
  );

  res.send(foundOptionGroups);
});

module.exports = optionGroupsUnderSubProceduresRouter;
