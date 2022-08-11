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

optionsRouter.delete('/:id', middleware.checkAdminRights, async (req, res, next) => {
  const { id } = req.params;

  await Option.destroy({
    where: { plainOptionId: id },
  });
  const deletedPlainOption = await PlainOption.destroy({
    where: { id },
  });

  if (Number(deletedPlainOption) === 1) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

optionsRouter.put('/:id/:language', middleware.checkAdminRights, (req, res, next) => {
  const { language, id } = req.params;

  Option.update(req.body, {
    where: {
      plainOptionId: id,
      language,
    },
  })
    .then((num) => {
      if (Number(num) === 1) {
        res.send({
          message: 'Option was updated successfully.',
        });
      }
    })
    .catch((error) => next(error));
});

module.exports = optionsRouter;
