import { SuccessResponseMessages } from '../../const/response_messages.js'
import ProductModel from '../../models/products.js'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'
import responseData from '../../utils/response_message.js'

export const deleteReview = async (req, res, next) => {
  const productId = req.params.productId
  const reviewId = req.params.reviewId

  console.log(productId)
  try {
    const product = await ProductModel.findById(productId).exec()
    const reviews = product.reviews

    let updatedrating
    if (product.rating) {
      const review = reviews.find((e) => e._id.toString() == reviewId)
      if (review) {
        updatedrating = product.rating - review.rating / product.reviews.length
      }
    } else {
      updatedrating = 0
    }

    const updatedProduct = await product
      .updateOne({
        rating: updatedrating,
        $pull: { reviews: { _id: reviewId } }
      })
      .exec()
     
    res.status(200).json(
      responseData({
        statusCode: 200,
        message: SuccessResponseMessages.REVIEW_DELETED,
       
      })
    )
  } catch (e) {
    const error = mongooseErrorHandler(e)
    return next(error)
  }
}
