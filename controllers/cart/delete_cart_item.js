import { SuccessResponseMessages } from '../../const/response_messages.js'
import UserModel from '../../models/user.js'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'
import responseData from '../../utils/response_message.js'

const deleteCartProduct = async (req, res, next) => {
  const userId = req.userId
  try {
    const user = await UserModel.findById(userId).exec()
    const userCurrentCart = [...user.cart]

    const updatedCart = userCurrentCart.filter(
      (product) => !req.body.products.includes(product.product.toString()) // filter and get not equal products with current user cart
    )
    
    console.log(updatedCart)

    await user.updateOne({ $set: { cart: updatedCart } }).exec()
    res.status(200).json(
      responseData({
        statusCode: 200,
        message: SuccessResponseMessages.CART_ITEM_DELETED
    
      })
    )
  } catch (e) {
    const error = mongooseErrorHandler(e)
    next(error)
  }
}

export default deleteCartProduct
