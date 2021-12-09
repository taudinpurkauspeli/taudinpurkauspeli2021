/* eslint-disable consistent-return */
const differentialsUnderCasesRouter = require('express').Router();
const db = require('../../models');
const helper = require('../../utils/token');

const DifferentialUnderCase = db.differentalsUnderCases;
const Differential = db.differentials;
const DifferentialGroupUnderCase = db.differentialGroupsUnderCase;

DifferentialGroupUnderCase.belongsToMany(Differential, { through: DifferentialUnderCase });
Differential.belongsToMany(DifferentialGroupUnderCase, { through: DifferentialUnderCase });

// Create differential under case
differentialsUnderCasesRouter.post('/', (req, res, next) => {
  const decodedToken = helper.tokenCheck(req, res);
  if (decodedToken.affiliation !== 'faculty') {
    return res.status(401).json({ error: 'you do not have rights to do this action' });
  }

  const duc = {
    differentialGroupsUnderCaseId: req.body.diffGroupCaseId,
    differentialId: req.body.differentialId,
    description: req.body.description,
  };

  DifferentialUnderCase.create(duc)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => next(error));
});

// Retrieve all differentials
differentialsUnderCasesRouter.get('/:id', (req, res, next) => {
  helper.tokenCheck(req, res);

  const { id } = req.params;

  DifferentialGroupUnderCase.findOne({
    where: {
      id,
    },
    include: Differential,
  })
    .then((data) => {
      const returnedData = data.differentials.map((d) => {
        const singleObj = {};
        singleObj.id = d.id;
        singleObj.name = d.name;
        singleObj.description = d.differentialsUnderCase.description;
        return singleObj;
      });
      res.send(returnedData);
    })
    .catch((error) => next(error));
});

module.exports = differentialsUnderCasesRouter;
