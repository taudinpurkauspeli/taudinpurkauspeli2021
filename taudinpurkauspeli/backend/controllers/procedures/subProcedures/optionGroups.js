const optionGroupsRouter = require('express').Router();
const db = require('../../../models');
const middleware = require('../../../utils/middleware');

const PlainOptionGroup = db.plainOptionGroups;
const OptionGroup = db.optionGroups;

// Save a new optiongroup
optionGroupsRouter.post('/:language', middleware.checkAdminRights, async (req, res) => {
  // Create a optiongroup
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

  // Save optiongroup in the database
  const savedOptionGroup = await OptionGroup.findOrCreate({
    where: newOptionGroup,
    defaults: newOptionGroup,
  });

  res.json({
    id: savedOptionGroup[0].plainOptionGroupId,
    name: savedOptionGroup[0].name,
  });
});

// Retrieve all optiongroups
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

optionGroupsRouter.delete('/:id', middleware.checkAdminRights, async (req, res, next) => {
  const { id } = req.params;

  await OptionGroup.destroy({
    where: { plainOptionGroupId: id },
  });
  const deletedPlainOptionGroup = await PlainOptionGroup.destroy({
    where: { id },
  });

  if (Number(deletedPlainOptionGroup) === 1) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

optionGroupsRouter.put('/:id/:language', middleware.checkAdminRights, (req, res, next) => {
  const { language, id } = req.params;

  OptionGroup.update(req.body, {
    where: {
      plainOptionGroupId: id,
      language,
    },
  })
    .then((num) => {
      if (Number(num) === 1) {
        res.send({
          message: 'OptionGroup was updated successfully.',
        });
      }
    })
    .catch((error) => next(error));
});

module.exports = optionGroupsRouter;
