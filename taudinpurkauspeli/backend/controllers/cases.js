/* eslint-disable consistent-return */
const caseRouter = require('express').Router();
const db = require('../models');
const helper = require('../utils/token');
const middleware = require('../utils/middleware');

const PlainCase = db.plainCases;
const Case = db.cases;
const { Op } = db.Sequelize;

// Save a new case
caseRouter.post('/:language', middleware.checkAdminRights, async (req, res) => {
  const { language } = req.params;
  let { id } = req.body;
  const {
    hidden, title, anamnesis,
  } = req.body;

  if (id === undefined) {
    const newPlainCase = await PlainCase.create({ hidden });
    id = newPlainCase.id;
  }

  const newCase = {
    plainCaseId: id,
    language,
    isDefault: language === 'fi',
    title,
    anamnesis,
  };

  const savedCase = await Case.create(newCase);

  res.json({
    id: savedCase.plainCaseId,
    title: savedCase.title,
    anamnesis: savedCase.anamnesis,
    hidden,
  });
});

// Retrieve all cases
caseRouter.get('/:language', async (req, res) => {
  const { language } = req.params;

  const data = await Case.findAll({
    where: { language },
    include: {
      model: PlainCase,
      attributes: [],
    },
    attributes: [
      'title',
      'anamnesis',
      ['plainCaseId', 'id'],
      [db.Sequelize.literal('"plainCase"."hidden"'), 'hidden'],
    ],
  });
  const user = await helper.createUser(req);

  res
    .status(200)
    .send({
      user, data,
    });
});

// Find a single case (by id)
caseRouter.get('/:id/:language', middleware.checkUserRights, async (req, res) => {
  const { id, language } = req.params;

  const foundCase = await Case.findOne({
    where: {
      plainCaseId: id,
      [Op.or]: [{ language }, { isDefault: true }],
    },
    include: {
      model: PlainCase,
      attributes: [],
    },
    attributes: [
      'title',
      'anamnesis',
      ['plainCaseId', 'id'],
      [db.Sequelize.literal('"plainCase"."hidden"'), 'hidden'],
    ],
  });

  if (foundCase === null) {
    res.send(404).end();
  } else {
    res.json(foundCase);
  }
});

// Update a case (by id)
caseRouter.put('/:id/:language', middleware.checkAdminRights, async (req, res) => {
  const { id, language } = req.params;
  const {
    title, anamnesis, hidden,
  } = req.body;

  await Case.update({ title, anamnesis, plainCaseId: id }, {
    where: { plainCaseId: id, language },
  });
  await PlainCase.update({ hidden }, {
    where: { id },
  });

  res.send({
    message: 'Case was updated successfully.',
  });
});

// Delete a case (by id)
caseRouter.delete('/:id', middleware.checkAdminRights, async (req, res) => {
  const { id } = req.params;

  await Case.destroy({
    where: { plainCaseId: id },
  });
  const deletedplainCase = await PlainCase.destroy({
    where: { id },
  });

  if (Number(deletedplainCase) === 1) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

// Delete all cases
caseRouter.delete('/', middleware.checkAdminRights, async (req, res) => {
  await Case.destroy({
    where: {},
    truncate: false,
  });

  res.status(204).end();
});

module.exports = caseRouter;
