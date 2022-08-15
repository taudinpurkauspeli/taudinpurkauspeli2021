/* eslint-disable consistent-return */
const differentialGroupRouter = require('express').Router();
const db = require('../../models');
const middleware = require('../../utils/middleware');

const PlainDifferentialGroup = db.plainDifferentialGroups;
const DifferentialGroup = db.differentialGroups;

// Save a new differentialgroup
differentialGroupRouter.post('/:language', middleware.checkAdminRights, async (req, res) => {
  // Create a differentialgroup
  const { language } = req.params;
  let { id } = req.body;
  const { name } = req.body;

  if (id === undefined) {
    const newPlainDiffGroup = await PlainDifferentialGroup.create({});
    id = newPlainDiffGroup.id;
  }

  const newDifferentialGroup = {
    plainDifferentialGroupId: id,
    language,
    isDefault: language === 'fi',
    name,
  };

  // Save differentialgroup in the database
  const savedDifferentialGroup = await DifferentialGroup.findOrCreate({
    where: newDifferentialGroup,
    defaults: newDifferentialGroup,
  });

  res.json({
    id: savedDifferentialGroup[0].plainDifferentialGroupId,
    name: savedDifferentialGroup[0].name,
  });
});

// Retrieve all differentialgroups
differentialGroupRouter.get('/:language', middleware.checkUserRights, async (req, res) => {
  const { language } = req.params;

  const foundDifferentialGroups = await DifferentialGroup.findAll({
    where: { language },
    include: {
      model: PlainDifferentialGroup,
      attributes: [],
    },
    attributes: [
      ['plainDifferentialGroupId', 'id'],
      'name',
    ],
  });

  res.json(foundDifferentialGroups);
});

differentialGroupRouter.put('/:id/:language', middleware.checkAdminRights, (req, res, next) => {
  const { language, id } = req.params;

  DifferentialGroup.update(req.body, {
    where: {
      plainDifferentialGroupId: id,
      language,
    },
  })
    .then((num) => {
      if (Number(num) === 1) {
        res.send({
          message: 'DifferentialGroup was updated successfully.',
        });
      }
    })
    .catch((error) => next(error));
});

differentialGroupRouter.delete('/:id', middleware.checkAdminRights, async (req, res, next) => {
  const { id } = req.params;

  await DifferentialGroup.destroy({
    where: { plainDifferentialGroupId: id },
  });
  const deletedPlainDifferentialGroup = await PlainDifferentialGroup.destroy({
    where: { id },
  });

  if (Number(deletedPlainDifferentialGroup) === 1) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = differentialGroupRouter;
