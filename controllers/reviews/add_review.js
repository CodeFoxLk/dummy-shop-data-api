import { body, check } from 'express-validator'
import {
  ErrorMessages,
  SuccessResponseMessages
} from '../../const/response_messages.js'
import ProductModel from '../../models/products.js'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'
import validationErrorHandler from '../../utils/error_handlers/validation_error_handler.js'
import responseData from '../../utils/response_message.js'

export const addReview = async (req, res, next) => {
  const err = validationErrorHandler(req)
  if (err) {
    return next(err)
  }
  const productId = req.params.productId
  const userId = req.userId
  const userNewReview = req.body.review
  const userNewRating = req.body.rating

  try {
    const product = await ProductModel.findById(productId).exec()

    if(!product){
      return res.status(404).json(
        responseData({
          statusCode: 404,
          message: SuccessResponseMessages.NO_PRODUCT_FOUD
          //data : newReview
        })
      )
    }

    const reviews = product.reviews
    const reviewsCount = reviews.length

    const currentProductRating =
      product.rating == null || product.rating == Infinity ? 0 : product.rating
    const sumOfAllCurrentRatings = currentProductRating * reviewsCount ?? 0
    const newproductRating =
      (sumOfAllCurrentRatings + userNewRating) / (reviewsCount + 1)
    const newReview = {
      by: userId,
      review: userNewReview,
      rating: userNewRating
    }

    const updatedProduct = await product
      .updateOne({
        rating: newproductRating,
        $push: {
          reviews: newReview
        }
      })
      .exec()

    //    const productReviews = product.reviews
    res.status(201).json(
      responseData({
        statusCode: 201,
        message: SuccessResponseMessages.REVIEW_ADDED
        //data : newReview
      })
    )
  } catch (e) {
    const error = mongooseErrorHandler(e)
    return next(error)
  }
}

export const validateReview = [
  body('review').trim(),
  body('rating', ErrorMessages.INVALID_RATING).isInt({ min: 0, max: 5 })
]
