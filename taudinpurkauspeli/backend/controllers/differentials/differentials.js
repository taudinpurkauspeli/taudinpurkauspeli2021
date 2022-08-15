/* eslint-disable consistent-return */
const differentialRouter = require('express').Router();
const db = require('../../models');
const middleware = require('../../utils/middleware');

const Differential = db.differentials;
const PlainDifferential = db.plainDifferentials;

// Save a new differential
differentialRouter.post('/:language', middleware.checkAdminRights, async (req, res) => {
  const { language } = req.params;
  let { id } = req.body;
  const { name } = req.body;

  if (id === undefined) {
    const newPlainDifferential = await PlainDifferential.create({});
    id = newPlainDifferential.id;
  }

  const newDifferential = {
    plainDifferentialId: id,
    language,
    isDefault: language === 'fi',
    name,
  };

  // Save differential to the database
  const savedDifferential = await Differential.findOrCreate({
    where: newDifferential,
    defaults: newDifferential,
  });

  res.json({
    id: savedDifferential[0].plainDifferentialId,
    name: savedDifferential[0].name,
  });
});

// Retrieve all differentials
differentialRouter.get('/:language', middleware.checkUserRights, async (req, res) => {
  const { language } = req.params;

  /*
  const foundDifferentials = await Differential.findAll({
    order: [
      ['plainDifferentialId'],
      ['language'],
    ],
    where: {
      [Op.or]: [{ language }, { isDefault: true }],
    },
    include: {
      model: PlainDifferential,
      attributes: [],
    },
    attributes: [
      'name',
      ['plainDifferentialId', 'id'],
      // [db.sequelize.fn('DISTINCT', db.sequelize.col('plainDifferentialId')), 'id'],
    ],
    group: ['plainDifferentialId'],
    raw: true,
  });
  */

  const foundDifferentials = await Differential.findAll({
    where: { language },
    include: {
      model: PlainDifferential,
      attributes: [],
    },
    attributes: [
      ['plainDifferentialId', 'id'],
      'name',
    ],
  });

  res.json(foundDifferentials);
});

// Update a differential (by id)
differentialRouter.put('/:id/:language', middleware.checkAdminRights, (req, res, next) => {
  const { language, id } = req.params;

  Differential.update(req.body, {
    where: {
      plainDifferentialId: id,
      language,
    },
  })
    .then((num) => {
      if (Number(num) === 1) {
        res.send({
          message: 'Differential was updated successfully.',
        });
      }
    })
    .catch((error) => next(error));
});

differentialRouter.delete('/:id', middleware.checkAdminRights, async (req, res, next) => {
  const { id } = req.params;

  await Differential.destroy({
    where: { plainDifferentialId: id },
  });
  const deletedPlainDifferential = await PlainDifferential.destroy({
    where: { id },
  });

  if (Number(deletedPlainDifferential) === 1) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = differentialRouter;
