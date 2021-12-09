/* eslint-disable consistent-return */
const differentialGroupsUnderCasesRouter = require('express').Router();
const db = require('../../models');
const helper = require('../../utils/token');

const DifferentialGroupUnderCase = db.differentialGroupsUnderCase;
const Case = db.cases;
const DifferentialGroup = db.differentialGroups;

Case.belongsToMany(DifferentialGroup, { through: DifferentialGroupUnderCase });
DifferentialGroup.belongsToMany(Case, { through: DifferentialGroupUnderCase });

// Create differentialgroup under case
differentialGroupsUnderCasesRouter.post('/', (req, res, next) => {
  const decodedToken = helper.tokenCheck(req, res);
  if (decodedToken.affiliation !== 'faculty') {
    return res.status(401).json({ error: 'you do not have rights to do this action' });
  }

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
differentialGroupsUnderCasesRouter.get('/:id', (req, res, next) => {
  helper.tokenCheck(req, res);

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
