import bcrypt from 'bcryptjs'
import { body } from 'express-validator'
import {
  ErrorMessages,
  SuccessResponseMessages
} from '../../const/error_messages.js'
import UserModel from '../../models/user.js'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'
import validationErrorHandler from '../../utils/error_handlers/validation_error_handler.js'

export const signUp = async (req, res, next) => {
  const err = validationErrorHandler(req)
  if (err) {
    return next(err)
  }

  const email = req.body.email
  const name = req.body.name
  const password = req.body.password

  try {
    const encryptedPassword = await bcrypt.hash(password, 12)
    await new UserModel({
      email: email,
      name: name,
      password: encryptedPassword
    }).save()

    res
      .status(201)
      .json({ 'message': SuccessResponseMessages.UPDATE_SUCESS })
  } catch (error) {
    if (error.code == 11000) {
      error.message = ErrorMessages.ALREADY_REGISTERED_EMAIL
      error.statusCode = 409
    } else {
      const e = mongooseErrorHandler(error)
      return next(e)
    }

    next(error)
  }
}

export const signupValidations = [
  body('email', ErrorMessages.INVALID_EMAIL).isEmail(),
  body('name', ErrorMessages.INVALID_NAME).notEmpty(),
  body('password', ErrorMessages.INVALID_PASSWORD).isStrongPassword({
    minLength: 5,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 0
  })
]
