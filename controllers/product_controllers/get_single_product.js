import productModel from '../../models/products.js'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'
import prapareProduct from './prapare_product.js'

export default async (req, res, next) => {
  const productId = req.params.productId
  try {
    const product = await productModel
      .findById(productId)
      .select('-__v')
      .lean()
      .exec()
    
    res.status(200).json(prapareProduct(product))
  } catch (e) {
    
    const error = mongooseErrorHandler(e)
   
    return next(error)
  }
}
