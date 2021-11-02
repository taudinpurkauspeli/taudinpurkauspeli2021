const proceduresRouter = require('express').Router();
const db = require('../models');

const Procedure = db.procedures;
// const { Op } = db.Sequelize;

// Save a new procedure under case
proceduresRouter.post('/', (req, res) => {
  // Validate request - title
  if (!req.body.title) {
    res.status(400).send({
      message: 'The procedure has to have a name!',
    });
    return;
  }

  // Create a procedure under case
  const procedureObject = {
    title: req.body.title,
  };

  // Save procedure in the database
  Procedure.create(procedureObject)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Unknown error occurred while adding the procedure. Try again.',
      });
    });
});

// Retrieve all procedures
proceduresRouter.get('/', (req, res) => {
  const { title } = req.query;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Procedure.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Unknown error occurred while retrieving procedures. Try again.',
      });
    });
});

module.exports = proceduresRouter;
