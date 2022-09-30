// import ProductModel from '../../models/products.js'
// import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'

// export const getReviews = async (req, res, next) => {
//   const productId = req.query.product_id
//   const page = req.query.page
//   const count = req.query.count

//   try {
//     const product = await ProductModel.findById(productId).select('').exec()
//     const reviews = product.reviews
    
//   } catch (e) {
//     const error = mongooseErrorHandler(e)
//     return next(error)
//   }
// }
