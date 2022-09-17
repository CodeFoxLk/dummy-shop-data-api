import { validationResult } from 'express-validator'
import ProductModel from '../../models/products.js'
import { imageResize } from '../../utils/image_uploader.js'
import { body } from 'express-validator'

export async function createNewProduct(req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const err = new Error('validation failed')
    err.statusCode = 422
    console.log(errors)
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
        review: req.body.review,
      },
    ],
  })

  try {
    const result = await product.save()
    res.status(201).json(result)
  } catch (err) {
    err.statusCode = 500
    next(err)
  }
}

export const productValidations = [
  body('title').trim().notEmpty().isLength({ max: 100 }),
  body('description').trim().notEmpty().isLength({ max: 1000 }),
  body('price').notEmpty().isNumeric(),
  // body('createdBy')
  //   .notEmpty()
  //   .custom((value, { req }) => {}),
]
