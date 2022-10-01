import ProductModel from '../../models/products.js'
import { promises } from 'fs'
import { imageResize } from '../../utils/image_uploader.js'
import { body } from 'express-validator'
import {
  ErrorMessages,
  SuccessResponseMessages
} from '../../const/response_messages.js'
import validationErrorHandler from '../../utils/error_handlers/validation_error_handler.js'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'
import responseData from '../../utils/response_message.js'

export const updateProduct = async (req, res, next) => {
  const err = validationErrorHandler(req)
  if (err) {
    return next(err)
  }

  const productId = req.params.productId
  const userId = req.userId

  const updateProduct = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discount: req.body.discount,
    rating: req.body.rating,
    brand: req.body.brand,
    subCategory: req.body.sub_category,
    superCategory: req.body.super_category,
    keywords: req.body.keywords
  }

  const oldProduct = await ProductModel.findOne({
    _id: productId,
    createdBy: userId
  }).exec()

  if(!oldProduct){
    return res.status(200).json(
      responseData({
        statusCode: 200,
        message: SuccessResponseMessages.NO_PRODUCT_FOUD,
      })
    )
  }

  // is if new image file available in the request
  let imageAvailable = req.files.length != 0 ? true : false
  console.log(imageAvailable)
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

  let updatedProduct
  try {
    // update product for the relavent user ID and productID
    updatedProduct = await oldProduct
      .updateOne(updateProduct, { new: true })
      .exec()

    res.status(200).json(
      responseData({
        statusCode: 200,
        message: SuccessResponseMessages.SUCESS,
        //data: updatedProduct
      })
    )
  } catch (e) {
    const error = mongooseErrorHandler(e)
    next(error)
  }

  // remove old images if new images are available
  if (imageAvailable) {
    await _removeImage(oldProduct)
    // remove old thumbnail
    if (oldProduct.thumbNail != null) {
      try {
        await promises.unlink(oldProduct.thumbNail)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

async function _removeImage(oldProduct) {
  let imageRemovePromise = new Promise(function (resolve, reject) {
    oldProduct.images.forEach(async (imagePath) => {
      try {
        await promises.unlink(imagePath)
      } catch (error) {
        console.log('Old images not removed ' + imagePath)
        reject(false)
      }
    })
    resolve(true)
  })
  return imageRemovePromise
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
  body('super_category', ErrorMessages.EMPTY_CATEGORY).optional().notEmpty(),
  body('sub_category', ErrorMessages.EMPTY_CATEGORY).optional().notEmpty()

  // body('createdBy')
  //   .notEmpty()
  //   .custom((value, { req }) => {}),
]
