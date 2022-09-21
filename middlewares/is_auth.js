import jwt from 'jsonwebtoken'
import { ErrorMessages } from '../const/error_messages.js'
import { JWTSECRET } from '../const/secrets_and_keys.js'

export default async (req, res, next) => {
  const authHeader = req.get('Authorization')

  if (!authHeader) {
    const error = new Error(ErrorMessages.NOT_AUTHENTICATED)
    error.statusCode = 401
    return next(error)
  }
  const token = authHeader.split(' ')[1]
  console.log(token)
  let decodedToken
  try {
    decodedToken = jwt.verify(token, JWTSECRET)
  } catch (err) {
    err.statusCode = 500
    return next(err)
  }
  if (!decodedToken) {
    const error = new Error(ErrorMessages.NOT_AUTHENTICATED)
    error.statusCode = 401
    return next(error)
  }
  req.userId = decodedToken.userId
  next()
}
