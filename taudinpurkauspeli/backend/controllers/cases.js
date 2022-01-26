/* eslint-disable consistent-return */
const caseRouter = require('express').Router();
const db = require('../models');
const helper = require('../utils/token');
const middleware = require('../utils/middleware');

const InitialCase = db.initialCases;
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
    const newInitialCase = await InitialCase.create({ hidden });
    id = newInitialCase.id;
  }

  const newCase = {
    initialCaseId: id,
    language,
    isDefault: language === 'fin',
    title,
    anamnesis,
  };

  const newSavedCase = await Case.create(newCase);

  res.json({
    title: newSavedCase.title,
    anamnesis: newSavedCase.anamnesis,
    hidden,
  });
});

// Retrieve all cases
caseRouter.get('/:language', async (req, res) => {
  const { language } = req.params;

  const data = await Case.findAll({
    where: { language },
    include: {
      model: InitialCase,
      as: 'initialCase',
      attributes: [],
    },
    attributes: [
      'title',
      'anamnesis',
      ['initialCaseId', 'id'],
      [db.Sequelize.literal('"initialCase"."hidden"'), 'hidden'],
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
      initialCaseId: id,
      [Op.or]: [{ language }, { isDefault: true }],
    },
    include: {
      model: InitialCase,
      as: 'initialCase',
      attributes: [],
    },
    attributes: [
      'title',
      'anamnesis',
      ['initialCaseId', 'id'],
      [db.Sequelize.literal('"initialCase"."hidden"'), 'hidden'],
    ],
  });

  if (foundCase === null) {
    res.send(404).end();
  }

  res.json(foundCase);
});

// Update a case (by id)
caseRouter.put('/:id/:language', middleware.checkAdminRights, async (req, res) => {
  const { id, language } = req.params;
  const {
    title, anamnesis, hidden,
  } = req.body;

  await Case.update({ title, anamnesis, initialCaseId: id }, {
    where: { initialCaseId: id, language },
  });
  await InitialCase.update({ hidden }, {
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
    where: { initialCaseId: id },
  });
  const deletedInitialCase = await InitialCase.destroy({
    where: { id },
  });

  if (Number(deletedInitialCase) === 1) {
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
