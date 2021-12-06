const differentialGroupRouter = require('express').Router();
const db = require('../../models');

const DifferentialGroup = db.differentialGroups;
const { Op } = db.Sequelize;

// Save a new differentialgroup
differentialGroupRouter.post('/', (req, res, next) => {
  // Create a differentialgroup
  const differentialGroup = {
    name: req.body.name,
  }

  // Save differentialgroup in the database
  DifferentialGroup.findOrCreate({
    where: {
      name: differentialGroup.name
    },
    defaults: {
      name: differentialGroup.name
    }
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error))
});

// Retrieve all differentialgroups
differentialGroupRouter.get('/', (req, res, next) => {
  const { title } = req.query;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  DifferentialGroup.findAll({ where: condition })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error))
});

module.exports = differentialGroupRouter;
