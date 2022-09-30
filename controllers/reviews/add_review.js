import { body, check } from 'express-validator'
import {
  ErrorMessages,
  SuccessResponseMessages
} from '../../const/error_messages.js'
import ProductModel from '../../models/products.js'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'
import validationErrorHandler from '../../utils/error_handlers/validation_error_handler.js'

export const addReview = async (req, res, next) => {
  const err = validationErrorHandler(req)
  if (err) {
    return next(err)
  }
  const productId = req.params.productId
  const userId = req.userId
  const review = req.body.review
  const userRating = req.body.rating

  try {
    const product = await ProductModel.findById(productId).exec()
    const reviews = product.reviews
    const reviewsCount = reviews.length

    const currentProductRating =
      product.rating == null || product.rating == Infinity ? 0 : product.rating
    const sumOfAllCurrentRatings = currentProductRating * reviewsCount ?? 0
    const newproductRating =
      (sumOfAllCurrentRatings + userRating) / (reviewsCount + 1)
    const newReview = {
      by: userId,
      review: review,
      rating: userRating
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
    res.status(200).json(newReview)
  } catch (e) {
    const error = mongooseErrorHandler(e)
    return next(error)
  }
}

export const validateReview = [
  body('review').trim(),
  body('rating', ErrorMessages.INVALID_RATING).isInt({ min: 0, max: 5 })
]
