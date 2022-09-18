import { body } from 'express-validator'

import ProductModel from '../../models/products.js'
import { imageResize } from '../../utils/image_uploader.js'
import validationErrorHandler from '../../utils/validation_error_handler.js'

export async function createNewProduct(req, res, next) {
  const err = validationErrorHandler(req)
  if (err) {
    return next(err)
  }

  let images = []

  if (!req.file && !req.files) {
    const err = new Error('No image provided')
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
    imageUrl: images,
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
  } catch (err) {
    err.statusCode = 500
    next(err)
  }
}

export const productCreateValidations = [
  body('title', 'Title has exceeded maximum length (100 characters)')
    .trim()
    .notEmpty()
    .isLength({ max: 100}),
  body('description', 'Description has exceeded maximum length (1000 characters)')
    .trim()
    .notEmpty()
    .isLength({ max: 1000 }),
  body('price', 'An invalid price').notEmpty().isNumeric()
  // body('createdBy')
  //   .notEmpty()
  //   .custom((value, { req }) => {}),
]
