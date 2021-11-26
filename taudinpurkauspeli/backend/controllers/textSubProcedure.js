const textSubProcedureRouter = require('express').Router();
const { subProcedures } = require('../models');
const db = require('../models');

const TextSubProcedure = db.textSubProcedures;
const SubProcedure = db.subProcedures;
const ProcedureUnderCase = db.proceduresUnderCases;
const { Op } = db.Sequelize;

SubProcedure.belongsToMany(ProcedureUnderCase, { through: TextSubProcedure });
ProcedureUnderCase.belongsToMany(SubProcedure, { through: TextSubProcedure });

// Save a new sub procedure under case
textSubProcedureRouter.post('/', (req, res) => {

  // Create a sub procedure under case
  const textSubProcedure = {
    totalSubID: req.body.totalSubID,
    procedureId: req.body.procedureId,
    title: req.body.title,
    text: req.body.text
  };

  // Save sub procedure under case in the database
  TextSubProcedure.create(textSubProcedure)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => next(error));
});

// Retrieve all sub procedures
textSubProcedureRouter.get('/', (req, res) => {
  const { totalSubId } = req.params;
  const condition = totalSubId ? { totalSubID: { [Op.iLike]: `%${totalSubId}%` } } : null;

  ProcedureUnderCase.findAll({ where: condition })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error))
});

// Update a sub procedure (by id)
textSubProcedureRouter.put('/:id', (req, res) => {
  const { id } = req.params;

  TextSubProcedure.update(req.body, {
    where: { totalSubID : id },
  })
    .then((num) => {
      if (Number(num) === 1) {
        res.send({
          message: 'Sub procedure was updated successfully.',
        });
      } 
    })
    .catch((error) => next(error))
});

module.exports = proceduresUnderCasesRouter;
