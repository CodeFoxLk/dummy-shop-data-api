import ProductModel from '../../models/products.js'
import { query } from 'express-validator'
import validationErrorHandler from '../../utils/validation_error_handler.js'

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
  } catch (error) {
    return next(error)
  }
}

export const getAllValidations = [
  query('page', 'Invalid page number').customSanitizer((value, { req }) => {
    if (isNaN(req.query.page)) {
      return 1 //If the page number is not a number 
    }
    return req.query.page
  }),
  query('count', 'invalid count')
    .customSanitizer((value, { req }) => {
      if (isNaN(value)) {
        return 20 //If the maximum count is not a number,
      }
      return req.query.count
    })
]
