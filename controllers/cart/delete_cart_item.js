import { SuccessResponseMessages } from '../../const/error_messages.js'
import UserSchema from '../../models/user.js'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'

const deleteCartProduct = async (req, res, next) => {
  const userId = req.userId
  try {
    const user = await UserSchema.findById(userId).exec()
    const cart = [...user.cart]
    const updatedCart = cart.filter(
      (product) => !req.body.products.includes(product.product.toString())
    )
    console.log(cart)
    await user.updateOne({ $set: { cart : updatedCart } }).exec()
    res.status(200).json({
        'message' : SuccessResponseMessages.UPDATE_SUCESS
    })
  } catch (e) {
    const error = mongooseErrorHandler(e)
    next(error)
  }
}

export default deleteCartProduct
