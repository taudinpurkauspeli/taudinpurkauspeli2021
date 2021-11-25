const differentialGroupsUnderCasesRouter = require('express').Router();
const db = require('../../models');

const DifferentialGroupUnderCase = db.differentialGroupsUnderCase;
const Case = db.cases;
const DifferentialGroup = db.differentialGroups
const { Op } = db.Sequelize;

Case.belongsToMany(DifferentialGroup, { through: DifferentialGroupUnderCase });
DifferentialGroup.belongsToMany(Case, { through: DifferentialGroupUnderCase });

// Create differentialgroup under case
differentialGroupsUnderCasesRouter.post('/', (req, res, next) => {
    const newObject = {
        caseId: req.body.caseId,
        differentialGroupId: req.body.differentialGroupId,
    };

    DifferentialGroupUnderCase.create(newObject)
        .then((data) => {
            res.send(data);
        })
        .catch((error) => next(error));
})

// Retrieve all groups associated to a specific case
differentialGroupsUnderCasesRouter.get('/:id', (req, res, next) => {
    const { id } = req.params;

    Case.findOne({
        where: {
            id
        },
        include: DifferentialGroup
    })
        .then((data) => {
            const returnedData = data.differentialGroups.map((d) => {
                var singleObj = {};
                singleObj['id'] = d.id
                singleObj['name'] = d.name;
                singleObj['diffGroupCaseId'] = d.differentialGroupsUnderCase.id;
                return singleObj;
            })
            res.send(returnedData);
        })
        .catch((error) => next(error))
})

module.exports = differentialGroupsUnderCasesRouter;