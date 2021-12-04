const subProceduresRouter = require('express').Router();
const db = require('../models');

const SubProcedure = db.subProcedures
const ProcedureUnderCase = db.proceduresUnderCases;
const { Op } = db.Sequelize;

// Save a new subprocedure
subProceduresRouter.post('/', (req, res) => {

  // Create a subprocedure
  const subProcedure = {
    priority: req.body.priority,
    type: req.body.type,
  };

  // Save subprocedure in the database
  SubProcedure.create(subProcedure)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => next(error));
});

// Retrieve all subprocedures
subProceduresRouter.get('/', (req, res, next) => {
  const { id } = req.params;
  const condition = id ? { caseId: { [Op.iLike]: `%${id}%` } } : null;

  SubProcedure.findAll({ where: condition })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error))
});

// Retrieve all subprocedures including textSubProcedures
subProceduresRouter.get('/:id', (req, res, next) => {
    const { id } = req.params;
  
    ProcedureUnderCase.findAll({
        include: [{
          model: SubProcedure,
        }],
        where: {
          procedureId: id,
        }
      })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => next(error))
  });

// Update a subprocedure (by id)
subProceduresRouter.put('/:id', (req, res) => {
  const { id } = req.params;

  SubProcedure.update(req.body, {
    where: { id : id },
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

module.exports = subProceduresRouter;