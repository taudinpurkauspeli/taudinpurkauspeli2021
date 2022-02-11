/* eslint-disable consistent-return */
const userRouter = require('express').Router();
const db = require('../models');
const middleware = require('../utils/middleware');

const User = db.users;

userRouter.get('/', middleware.checkAdminRights, async (req, res, next) => {
  const users = await User.findAll({});

  if (users === null) {
    res.send(404).end();
  }
  res.json(users);
});

module.exports = userRouter;
