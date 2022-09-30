import ProductModel from '../../models/products.js'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'

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
    res.status(200).json({
      updatedProduct
    })
  } catch (e) {
    const error = mongooseErrorHandler(e)
    return next(error)
  }
}
