const optionGroupsRouter = require('express').Router();
const db = require('../../../models');
const middleware = require('../../../utils/middleware');

const PlainOptionGroup = db.plainOptionGroups;
const OptionGroup = db.optionGroups;

// Save a new differentialgroup
optionGroupsRouter.post('/:language', middleware.checkAdminRights, async (req, res) => {
  // Create a differentialgroup
  const { language } = req.params;
  let { id } = req.body;
  const { name } = req.body;

  if (id === undefined) {
    const newPlainOptionGroup = await PlainOptionGroup.create({});
    id = newPlainOptionGroup.id;
  }

  const newOptionGroup = {
    plainOptionGroupId: id,
    language,
    isDefault: language === 'fi',
    name,
  };

  // Save differentialgroup in the database
  const savedOptionGroup = await OptionGroup.findOrCreate({
    where: newOptionGroup,
    defaults: newOptionGroup,
  });

  res.json({
    id: savedOptionGroup[0].plainOptionGroupId,
    name: savedOptionGroup[0].name,
  });
});

// Retrieve all differentialgroups
optionGroupsRouter.get('/:language', middleware.checkUserRights, async (req, res) => {
  const { language } = req.params;

  const foundOptionGroups = await OptionGroup.findAll({
    where: { language },
    attributes: [
      ['plainOptionGroupId', 'id'],
      'name',
    ],
  });

  res.json(foundOptionGroups);
});

module.exports = optionGroupsRouter;
