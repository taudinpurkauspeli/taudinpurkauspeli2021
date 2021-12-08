const proceduresRouter = require('express').Router();
const { procedures } = require('../models');
const db = require('../models');
const helper = require('../utils/helpers')

const Procedure = db.procedures;
const Case = db.cases;
// const { Op } = db.Sequelize;

// Save a new procedure under case
proceduresRouter.post('/', (req, res, next) => {
  const decodedToken = helper.tokenCheck(req, res)
  if (decodedToken.affiliation !== 'faculty') {
    return res.status(401).json({ error: 'you do not have rights to do this action' })
  }
  
  // Create a procedure under case
  const procedureObject = {
    title: req.body.title,
  };

  // Save procedure in the database
  Procedure.create(procedureObject)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error))
});

// Retrieve all procedures
proceduresRouter.get('/', (req, res, next) => {
  helper.tokenCheck(req, res)
  const { title } = req.query;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Procedure.findAll({ where: condition })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error))
});

// Retrieve all procedures including procedure under cases
proceduresRouter.get('/:id', (req, res) => {
  helper.tokenCheck(req, res)
  const { id } = req.params;

  Case.findAll({
      include: [{
        model: Procedure,
      }],
      where: {
        id: id,
      }
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error))
});

// Update a procedure (by id)
proceduresRouter.put('/:id', (req, res) => {
  const decodedToken = helper.tokenCheck(req, res)
  if (decodedToken.affiliation !== 'faculty') {
    return res.status(401).json({ error: 'you do not have rights to do this action' })
  }
  
  const { id } = req.params;

  Procedure.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (Number(num) === 1) {
        res.send({
          message: 'Procedure was updated successfully.',
        });
      } 
    })
    .catch((error) => next(error))
});

module.exports = proceduresRouter;
