/* eslint-disable consistent-return */
const differentialGroupsUnderCasesRouter = require('express').Router();
const db = require('../../models');
const middleware = require('../../utils/middleware');

const DifferentialGroupUnderCase = db.differentialGroupsUnderCases;
const Case = db.cases;
const DifferentialGroup = db.differentialGroups;

// Create differentialgroup under case
differentialGroupsUnderCasesRouter.post('/', middleware.checkAdminRights, (req, res, next) => {
  const newObject = {
    caseId: req.body.caseId,
    differentialGroupId: req.body.differentialGroupId,
  };

  DifferentialGroupUnderCase.create(newObject)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => next(error));
});

// Retrieve all groups associated to a specific case
differentialGroupsUnderCasesRouter.get('/:id', middleware.checkUserRights, (req, res, next) => {
  const { id } = req.params;

  Case.findOne({
    where: {
      id,
    },
    include: DifferentialGroup,
  })
    .then((data) => {
      const returnedData = data.differentialGroups.map((d) => {
        const singleObj = {};
        singleObj.id = d.id;
        singleObj.name = d.name;
        singleObj.diffGroupCaseId = d.differentialGroupsUnderCase.id;
        return singleObj;
      });
      res.send(returnedData);
    })
    .catch((error) => next(error));
});

module.exports = differentialGroupsUnderCasesRouter;
