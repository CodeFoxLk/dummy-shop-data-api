import { body } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserModel from '../../models/user.js'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'
import validationErrorHandler from '../../utils/error_handlers/validation_error_handler.js'
import { ErrorMessages } from '../../const/error_messages.js'
import { JWTSECRETKEY } from '../../const/secrets_and_keys.js'


export const login = async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  let loadedUser

  try {

    const err = validationErrorHandler(req)
    if (err) {
      return next(err)
    }

    const user = await UserModel.findOne({ email: email }).exec()
    if (!user) {
      const error = new Error(ErrorMessages.USER_NOT_FOUND_FOR_EMAIL)
      error.statusCode = 401
      throw error
    }
    loadedUser = user
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) {
      const error = new Error(ErrorMessages.EMAIL_OR_PASSWORD_INCORRECT)
      error.statusCode = 401
      throw error
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      JWTSECRETKEY,
      { expiresIn: '1h' }
    )
    res.status(200).json({ token: token})
  } catch (e) {
    const error = mongooseErrorHandler(e)
    next(error)
  }
}

export const loginValidations = [
  body('email', ErrorMessages.INVALID_EMAIL).isEmail()
]
