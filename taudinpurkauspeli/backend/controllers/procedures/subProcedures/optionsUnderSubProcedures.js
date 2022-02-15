const optionsUnderSubProceduresRouter = require('express').Router();
const db = require('../../../models');
const middleware = require('../../../utils/middleware');

const OptionsUnderSubProcedures = db.optionsUnderSubProcedures;
const Options = db.options;
const PlainDescriptions = db.plainDescriptions;
const Descriptions = db.descriptions;

optionsUnderSubProceduresRouter.post('/:language', middleware.checkAdminRights, async (req, res) => {
  const { language } = req.params;
  const {
    optionGroupSubProcedureId, optionId, description, isRequired,
  } = req.body;

  const savedPlainDescription = await PlainDescriptions.create({});

  const newDescription = {
    language,
    isDefault: language === 'fi',
    description,
    plainDescriptionId: savedPlainDescription.id,
  };

  const savedDescription = await Descriptions.create(newDescription);

  const ouc = {
    optionGroupsUnderSubProcedureId: optionGroupSubProcedureId,
    plainOptionId: optionId,
    plainDescriptionId: savedPlainDescription.id,
    isRequired,
  };

  const savedOuc = await OptionsUnderSubProcedures.create(ouc);
  const response = await Options.findOne({
    where: {
      plainOptionId: savedOuc.plainOptionId,
      language,
    },
  });

  res.send({
    optionGroupSubProcedureId: savedOuc.optionGroupsUnderSubProcedureId,
    id: response.plainOptionId,
    description: savedDescription.description,
    name: response.name,
  });
});

// Retrieve all options
optionsUnderSubProceduresRouter.get('/:id/:type/:language', middleware.checkUserRights, async (req, res) => {
  const { id, type, language } = req.params;

  let foundOptions = [];

  if (type === 'INTERVIEW') {
    foundOptions = await db.sequelize.query(
      `SELECT ouc."optionGroupsUnderSubProcedureId" AS "optionGroupSubProcedureId", ouc."plainOptionId" AS id, d.description, o.name, ouc."isRequired"
    FROM option_groups_under_sub_procedures AS oguc
    LEFT JOIN options_under_sub_procedures AS ouc ON oguc.id = ouc."optionGroupsUnderSubProcedureId"
    LEFT JOIN options AS o ON ouc."plainOptionId" = o."plainOptionId"
    LEFT JOIN descriptions AS d ON ouc."plainDescriptionId" = d."plainDescriptionId"
    WHERE oguc."plainSubProcedureId" = ? AND o.language = ? AND d.language = ?`,
      {
        replacements: [id, language, language],
        type: db.sequelize.QueryTypes.SELECT,
      },
    );
  } else if (type === 'QUESTION') {
    foundOptions = await db.sequelize.query(
      `SELECT qouc."plainOptionId" AS id, d.description, o.name, qouc."isCorrect"
    FROM question_options_under_sub_procedures AS qouc
    LEFT JOIN options AS o ON qouc."plainOptionId" = o."plainOptionId"
    LEFT JOIN descriptions AS d ON qouc."plainDescriptionId" = d."plainDescriptionId"
    WHERE qouc."plainSubProcedureId" = ? AND o.language = ? AND d.language = ?`,
      {
        replacements: [id, language, language],
        type: db.sequelize.QueryTypes.SELECT,
      },
    );
  }

  res.send(foundOptions);
});

module.exports = optionsUnderSubProceduresRouter;
