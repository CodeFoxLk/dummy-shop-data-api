import { SuccessResponseMessages } from '../../const/response_messages.js'
import UserSchema from '../../models/user.js'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'
import responseData from '../../utils/response_message.js'

const deleteCartProduct = async (req, res, next) => {
  const userId = req.userId
  try {
    const user = await UserSchema.findById(userId).exec()
    const cart = [...user.cart]
    const updatedCart = cart.filter(
      (product) => !req.body.products.includes(product.product.toString())
    )
    console.log(cart)

    await user.updateOne({ $set: { cart: updatedCart } }).exec()
    res.status(200).json(
      responseData({
        statusCode: 200,
        data: { message: SuccessResponseMessages.CART_ITEM_DELETED }
      })
    )
  } catch (e) {
    const error = mongooseErrorHandler(e)
    next(error)
  }
}

export default deleteCartProduct
