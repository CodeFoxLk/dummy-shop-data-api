import { SuccessResponseMessages } from '../../const/response_messages.js'
import UserSchema from '../../models/user.js'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'
import responseData from '../../utils/response_message.js'

const updateCart = async (req, res, next) => {
  const userId = req.userId
  let productList = req.body.productList
  // productList = productList.map((product) => {
  //   product : product.productId
  //   qty : product.qty
  // })

  const user = await UserSchema.findById(userId).exec()
  const cart = [...user.cart]

  if (cart.length == 0) { // if user have empty cart, no needs to update existing qty
    const updatedUser = await user
      .updateOne({ $set: { cart: productList } })
      .exec()
    return res.status(201).json(
      responseData({
        statusCode: 201,
        data: { message: SuccessResponseMessages.CART_UPDATED }
      })
    )
  }

  // update quantities of existing products
  for (let i = 0; i < cart.length; i++) {
    const cartItem = cart[i] 
    for (let crt = 0; crt < productList.length; crt++) {
      const productItem = productList[crt]
      if (cartItem.product.toString() == productItem.product) {
        cartItem.qty = productItem.qty
      }
    }
  }

  try {
    await user.updateOne({ $set: { cart: cart } }).exec()
    res.status(201).json(
      responseData({
        statusCode: 201,
        data: { message: SuccessResponseMessages.CART_UPDATED }
      })
    )
  } catch (e) {
    const error = mongooseErrorHandler(e)
    next(error)
  }
}

export default updateCart
