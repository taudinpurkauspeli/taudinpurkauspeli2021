/* eslint-disable consistent-return */
const userRouter = require('express').Router();
const db = require('../models');
const middleware = require('../utils/middleware');

const User = db.users;

userRouter.get('/', middleware.checkAdminRights, (req, res, next) => {
  User.findAll({})
    .then((data) => {
      if (data === null) {
        res.send(404).end();
      }
      res.json(data);
    })
    .catch((error) => next(error));
});

module.exports = userRouter;
