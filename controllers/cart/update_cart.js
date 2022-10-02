import { SuccessResponseMessages } from '../../const/response_messages.js'
import UserModel from '../../models/user.js'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'
import responseData from '../../utils/response_message.js'

const updateCart = async (req, res, next) => {
  const userId = req.userId
  let newCartProductList = req.body.productList

  // productList = productList.map((product) => {
  //   product : product.productId
  //   qty : product.qty
  // })

  const user = await UserModel.findById(userId).exec()
  const userCurrentCart = [...user.cart]

  if (userCurrentCart.length == 0) {
    // if user have empty cart, no needs to update existing qty, directly save the cart
    const updatedUser = await user
      .updateOne({ $set: { cart: newCartProductList } })
      .exec()
    return res.status(201).json(
      responseData({
        statusCode: 201,
        data: { message: SuccessResponseMessages.CART_UPDATED }
      })
    )
  }

  // update quantities of existing products
  for (let i = 0; i < userCurrentCart.length; i++) {
    const cartItem = userCurrentCart[i]

    for (let index = 0; index < newCartProductList.length; index++) {
      const productItem = newCartProductList[index]
      if (cartItem.product.toString() == productItem.product) {
        cartItem.qty = productItem.qty
      }
    }
  }

  try {
    await user.updateOne({ $set: { cart: userCurrentCart } }).exec()
    res.status(201).json(
      responseData({
        statusCode: 201,
        message: SuccessResponseMessages.CART_UPDATED
      })
    )
  } catch (e) {
    const error = mongooseErrorHandler(e)
    next(error)
  }
}

export default updateCart
