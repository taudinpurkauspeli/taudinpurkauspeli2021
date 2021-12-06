const differentialsUnderCasesRouter = require('express').Router();
const db = require('../../models');

const DifferentialUnderCase = db.differentalsUnderCases;
const Differential = db.differentials;
const DifferentialGroupUnderCase = db.differentialGroupsUnderCase;
const { Op } = db.Sequelize;

DifferentialGroupUnderCase.belongsToMany(Differential, { through: DifferentialUnderCase });
Differential.belongsToMany(DifferentialGroupUnderCase, { through: DifferentialUnderCase });


// Create differential under case
differentialsUnderCasesRouter.post('/', (req, res, next) => {
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
})

// Retrieve all differentials
differentialsUnderCasesRouter.get('/:id', (req, res, next) => {
    const { id } = req.params;

    DifferentialGroupUnderCase.findOne({
        where: {
            id
        },
        include: Differential
    })
        .then((data) => {
            const returnedData = data.differentials.map((d) => {
                var singleObj = {};
                singleObj['id'] = d.id
                singleObj['name'] = d.name;
                singleObj['description'] = d.differentialsUnderCase.description;
                return singleObj;
            })
            res.send(returnedData);
        })
        .catch((error) => next(error))
})

module.exports = differentialsUnderCasesRouter;