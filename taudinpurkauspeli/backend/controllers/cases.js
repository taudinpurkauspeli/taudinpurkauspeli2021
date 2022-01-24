/* eslint-disable consistent-return */
const caseRouter = require('express').Router();
const db = require('../models');
const helper = require('../utils/token');
const middleware = require('../utils/middleware');

const InitialCase = db.initialCases;
const Case = db.cases;
const { Op } = db.Sequelize;

// Save a new case
caseRouter.post('/', middleware.checkAdminRights, async (req, res, next) => {
  let { id } = req.body;
  const {
    language, hidden, title, anamnesis,
  } = req.body;

  // console.log(`with title ${title} the id is ${id}`);

  if (id === undefined) {
    const newInitialCase = await InitialCase.create({ hidden });
    id = newInitialCase.id;
  }

  // console.log(`after the id of the title ${title} is ${id}`);

  const newCase = {
    initialCaseId: id,
    language,
    isDefault: language === 'fin',
    title,
    anamnesis,
  };

  // Save case in the database
  const newSavedCase = await Case.create(newCase);
  // console.log('info for new case', newSavedCase);
  try {
    res.json({
      title: newSavedCase.title,
      anamnesis: newSavedCase.anamnesis,
      hidden,
    });
  } catch (error) {
    next(error);
  }
});

// Retrieve all cases
caseRouter.get('/', async (req, res, next) => {
  const { title } = req.query;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  try {
    const data = await Case.findAll({
      attributes: ['title', 'anamnesis', ['initialCaseId', 'id']],
      where: condition,
      include: {
        model: InitialCase,
        as: 'initialCase',
        attributes: ['hidden'],
      },
    });
    const user = await helper.createUser(req);

    // console.log('cases retrieved from database', data);
    res
      .status(200)
      .send({
        user, data,
      });
  } catch (error) {
    next(error);
  }
});

// Find a single case (by id)
caseRouter.get('/:id/:language', middleware.checkUserRights, (req, res, next) => {
  const { id, language } = req.params;

  Case.findOne({
    where: {
      initialCaseId: id,
      language,
    },
    include: {
      model: InitialCase,
      as: 'initialCase',
      attributes: ['hidden'],
    },
  })
    .then((data) => {
      if (data === null) {
        res.send(404).end();
      }
      res.json(data);
    })
    .catch((error) => next(error));
});

// Update a case (by id)
caseRouter.put('/:id', middleware.checkAdminRights, async (req, res, next) => {
  const { id } = req.params;
  const {
    title, anamnesis, hidden, language,
  } = req.body;

  try {
    await Case.update({ title, anamnesis, initialCaseId: id }, {
      where: { initialCaseId: id, language },
    });
    await InitialCase.update({ hidden }, {
      where: { id },
    });
    res.send({
      message: 'Case was updated successfully.',
    });
  } catch (error) {
    next(error);
  }
});

// Delete a case (by id)
caseRouter.delete('/:id', middleware.checkAdminRights, (req, res, next) => {
  const { id } = req.params;

  Case.destroy({
    where: { id },
  })
    .then((num) => {
      if (Number(num) === 1) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Delete all cases
caseRouter.delete('/', middleware.checkAdminRights, (req, res, next) => {
  Case.destroy({
    where: {},
    truncate: false,
  })
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = caseRouter;
