import ProductModel from '../../models/products.js'
import { query } from 'express-validator'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'
import validationErrorHandler from '../../utils/error_handlers/validation_error_handler.js'
import { ErrorMessages } from '../../const/error_messages.js'

export const filterProducts = async (req, res, next) => {
  const filters = {}
  const sort = {}

  if (req.query.sub_category) {
    filters.subCategory = req.query.sub_category
  }
  if (req.query.super_category) {
    filters.super_category = req.query.super_category
  }
  if (req.query.less_than_price) {
    filters.price = { $lt: req.query.less_than_price }
  }
  if (req.query.greater_than_price) {
    filters.price = { $gt: req.query.greater_than_price }
  }
  if (req.query.search) {
    filters.$text = { $search: req.query.search }
   // filters.keywords = { $in : req.query.search}
  }

  console.log(filters)

  const sortQuery = req.query.sort

  switch (sortQuery) {
    case 'latest':
      sort.createdAt = -1
      break
    case 'lowprice':
      sort.price = 1
      break
    case 'highprice':
      sort.price = -1
      break
    default:
      sort.createdAt = -1
      break
  }

  try {
    const err = validationErrorHandler(req)
    if (err) {
      return next(err)
    }

    const page = parseInt(req.query.page || 1)
    const countPerPage = parseInt(req.query.count || 10)

    const allproducts = await ProductModel.find(filters)
      .select('-__v')
      .sort(sort)
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
