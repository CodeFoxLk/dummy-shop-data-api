import { body, check } from 'express-validator'
import { ErrorMessages } from '../../const/error_messages.js'
import ProductModel from '../../models/products.js'
import { imageResize } from '../../utils/image_uploader.js'
import validationErrorHandler from '../../utils/error_handlers/validation_error_handler.js'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'

export async function createNewProduct(req, res, next) {
  const err = validationErrorHandler(req)
  if (err) {
    return next(err)
  }

  let images = []

  if (!req.file && !req.files) {
    const err = new Error(ErrorMessages.IMAGES_NOT_PROVIDED)
    err.statusCode = 422
    return next(err)
  }

  const thumbnailPath = await imageResize(req.files[0], 250) // create thumbnail

  if (req.files) {
    images = req.files.map((image) => {
      return image.path
    })
  }

  const product = new ProductModel({
    title: req.body.title,
    description: req.body.description,
    images: images,
    thumbNail: thumbnailPath,
    price: req.body.price,
    discount: req.body.discount,
    rating: req.body.rating,
    brand: req.body.brand,
    category: req.body.category,
    keywords: req.body.keywords,
    createdBy: req.body.userId,
    reviews: [
      {
        by: req.body.reviewby,
        review: req.body.review
      }
    ]
  })

  try {
    const result = await product.save()
    res.status(201).json(result)
  } catch (e) {
    const error = mongooseErrorHandler(e)
    next(error)
  }
}

export const productCreateValidations = [
  body('title', ErrorMessages.TITLE_MAX_LENGTH_100)
    .trim()
    .notEmpty()
    .isLength({ max: 100 }),
  body('description', ErrorMessages.DESCRIPTION_MAX_LENGTH)
    .trim()
    .notEmpty()
    .isLength({ max: 1000 }),
  body('price', ErrorMessages.INVALID_PRICE).notEmpty().isNumeric(),
  body('category', ErrorMessages.EMPTY_CATEGORY).notEmpty()

  // body('createdBy')
  //   .notEmpty()
  //   .custom((value, { req }) => {}),
]
