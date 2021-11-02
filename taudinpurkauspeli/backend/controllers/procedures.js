const proceduresRouter = require('express').Router();
const db = require('../models');

const Procedure = db.proceduresUnderCases;
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
  const procedures = {
    title: req.body.title,
  };

  // Save procedure in the database
  Procedure.create(procedures)
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

module.exports = proceduresRouter;
