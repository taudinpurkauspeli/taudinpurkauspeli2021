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
    isDefault: language === 'fin',
    name,
  };

  // Save differentialgroup in the database
  const savedDifferentialGroup = await DifferentialGroup.findOrCreate({
    where: newDifferentialGroup,
    defaults: newDifferentialGroup,
  });

  res.json({
    id: savedDifferentialGroup.plainDifferentialGroupId,
    name: savedDifferentialGroup.name,
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
      'name',
      ['plainDifferentialGroupId', 'id'],
    ],
  });

  res.json(foundDifferentialGroups);
});

module.exports = differentialGroupRouter;
