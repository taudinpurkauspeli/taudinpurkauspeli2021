const userRouter = require('express').Router();
const db = require('../models');

const User = db.users;

userRouter.get('/', (req, res, next) => {
  User.findAll({})
    .then((data) => {
      if (data === null) {
        res.send(404).end()
      }
      res.json(data);
    })
    .catch((error) => next(error))
});

module.exports = userRouter;
