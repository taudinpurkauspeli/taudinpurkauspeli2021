const jwt = require('jsonwebtoken')
const userRouter = require('express').Router();
const db = require('../models');
const helper = require('../utils/helpers')

const User = db.users;

userRouter.get('/', (req, res, next) => {
  const decodedToken = helper.tokenCheck(req, res)
  if (decodedToken.affiliation !== 'faculty') {
    return res.status(401).json({ error: 'you do not have rights to do this action' })
  }

  User.findAll({})
    .then((data) => {
      if (data === null) {
        res.send(404).end()
      }
      res.json(data);
    })
    .catch((error) => next(error))
});

module.exports = userRouter
