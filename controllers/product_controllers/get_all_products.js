import ProductModel from '../../models/products.js'
import { query } from 'express-validator'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'
import validationErrorHandler from '../../utils/error_handlers/validation_error_handler.js'
import { ErrorMessages } from '../../const/error_messages.js'

export const getAllProducts = async (req, res, next) => {
  try {
    const err = validationErrorHandler(req)
    if (err) {
      return next(err)
    }

    const productCount = await ProductModel.count().exec()
    const page = parseInt(req.query.page || 1)
    const countPerPage = parseInt(req.query.count || 10)

    const allproducts = await ProductModel.find()
      .sort('-createdOn')
      .skip((page - 1) * countPerPage)
      .limit(countPerPage)
      .exec()
      
    res.status(200).json(allproducts)
  } catch (e) {
    const error = mongooseErrorHandler(e)
    return next(error)
  }
}

export const getAllValidations = [
  query('page', ErrorMessages.INVALID_PAGE_NUMBER).customSanitizer(
    (value, { req }) => {
      if (isNaN(req.query.page)) {
        return 1 //If the page number is not a number
      }
      return req.query.page
    }
  ),
  query('count', ErrorMessages.INVALID_PRODUCT_COUNT).customSanitizer(
    (value, { req }) => {
      if (isNaN(value)) {
        return 20 //If the maximum count is not a number,
      }
      return req.query.count
    }
  )
]
