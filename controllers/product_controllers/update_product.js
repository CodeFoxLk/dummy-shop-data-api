import ProductModel from '../../models/products.js'
import { promises } from 'fs'
import { imageResize } from '../../utils/image_uploader.js'
import { body } from 'express-validator'
import { ErrorMessages } from '../../const/error_messages.js'
import validationErrorHandler from '../../utils/error_handlers/validation_error_handler.js'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'

export const updateProduct = async (req, res, next) => {
  const err = validationErrorHandler(req)
  if (err) {
    return next(err)
  }

  const productId = req.params.productId
  
  const updateProduct = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discount: req.body.discount,
    rating: req.body.rating,
    brand: req.body.brand,
    category: req.body.category,
    keywords: req.body.keywords
  }

  const oldProduct = await ProductModel.findById(productId).exec()

  // remove old images
  await _removeImage(oldProduct)
  // remove old thumbnail
  if (oldProduct.thumbNail != null) {
    try {
      await promises.unlink(oldProduct.thumbNail)
    } catch (error) {
      console.log(error)
    }
  }

  // is if new image file available in the request
  let imageAvailable = req.files ? true : false
  if (imageAvailable) {
    const images = req.files.map((image) => {
      return image.path
    })
    try {
      const thumbnailPath = await imageResize(req.files[0], 250) // create thumbnail
      updateProduct.images = images
      updateProduct.thumbNail = thumbnailPath
    } catch (error) {
      console.log(error)
    }
  }

  try {
    // update product
    const product = await ProductModel.findByIdAndUpdate(
      productId,
      updateProduct,
      { new: true }
    ).exec()
    res.status(200).json(product)
  } catch (e) {
    const error = mongooseErrorHandler(e)
    next(error)
  }
}

async function _removeImage(oldProduct) {
  const promises = []
  // remove old images
  oldProduct.images.forEach(async (imagePath) => {
    try {
      await promises.unlink(imagePath)
      promises.push(imagePath)
    } catch (error) {
      console.log('Old images not removed' + productId)
    }
  })
  return Promise.all(promises) // <-- This is where we await everything.
}

// const _removeImage = (filePath) => {
//   filePath = Path.join(__dirname, '..', '..', filePath)
//   unlink(filePath, (err) => {})
// }

export const productUpdateValidations = [
  body('title', ErrorMessages.TITLE_MAX_LENGTH_100)
    .optional()
    .trim()
    .isLength({ max: 100 }),
  body('description', ErrorMessages.DESCRIPTION_MAX_LENGTH)
    .optional()
    .trim()
    .isLength({ max: 1000 }),
  body('price', ErrorMessages.INVALID_PRICE).optional().isNumeric(),
  body('category', ErrorMessages.EMPTY_CATEGORY).optional().notEmpty()

  // body('createdBy')
  //   .notEmpty()
  //   .custom((value, { req }) => {}),
]
