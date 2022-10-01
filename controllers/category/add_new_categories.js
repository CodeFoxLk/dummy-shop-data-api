import { body, check } from 'express-validator'
import {
  ErrorMessages,
  SuccessResponseMessages
} from '../../const/response_messages.js'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'
import validationErrorHandler from '../../utils/error_handlers/validation_error_handler.js'
import responseData from '../../utils/response_message.js'
import CategoryModel from '../../models/categories.js'

export const addNewCategory = async (req, res, next) => {
  const err = validationErrorHandler(req)
  if (err) {
    return next(err)
  }

  const superCategory = req.body.superCategory
  const subCategories = req.body.subCategories

  try {
    const category = new CategoryModel({
      superCategory: superCategory,
      subcategories: subCategories
    })

    await category.save()

    res.status(201).json(
      responseData({
        statusCode: 201,
        message: SuccessResponseMessages.SUCESS,
        data: category
      })
    )
  } catch (e) {
    const error = mongooseErrorHandler(e)
    return next(error)
  }
}

export const validateCategory = [
  body('superCategory').trim().isString(),
  body('subCategories').optional().isArray()
]
