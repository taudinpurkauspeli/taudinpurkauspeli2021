const jwt = require('jsonwebtoken')
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

const getTokenFrom = request => { 
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const checkIfAdmin = async (request) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return false
  }
  const user = await User.findByPk(decodedToken.id)
  return user.affiliation === 'faculty'
}

module.exports = userRouter
