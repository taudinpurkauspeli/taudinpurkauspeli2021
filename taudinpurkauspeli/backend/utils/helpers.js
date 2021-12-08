const jwt = require('jsonwebtoken');

const tokenCheck = (request, response) => {
  let authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    authorization = authorization.substring(7)
  } 

  const decodedToken = jwt.verify(authorization, process.env.SECRET)
  if (!authorization || !decodedToken.id) {
    return response.status(401).json({ error: 'token is missing or invalid' })
  }
  
  return decodedToken
}

exports.tokenCheck = tokenCheck;