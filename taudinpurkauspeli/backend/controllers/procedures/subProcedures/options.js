const optionsRouter = require('express').Router();
const db = require('../../../models');
const middleware = require('../../../utils/middleware');

const Option = db.options;
const PlainOption = db.plainOptions;

optionsRouter.post('/:language', middleware.checkAdminRights, async (req, res) => {
  const { language } = req.params;
  let { id } = req.body;
  const { name } = req.body;

  if (id === undefined) {
    const newPlainOption = await PlainOption.create({});
    id = newPlainOption.id;
  }

  const newOption = {
    plainOptionId: id,
    language,
    isDefault: language === 'fi',
    name,
  };

  // Save option to the database
  const savedOption = await Option.findOrCreate({
    where: newOption,
    defaults: newOption,
  });

  res.json({
    id: savedOption[0].plainOptionId,
    name: savedOption[0].name,
  });
});

optionsRouter.get('/:language', middleware.checkUserRights, async (req, res) => {
  const { language } = req.params;

  const foundOptions = await Option.findAll({
    where: { language },
    attributes: [
      ['plainOptionId', 'id'],
      'name',
    ],
  });

  res.json(foundOptions);
});

module.exports = optionsRouter;
