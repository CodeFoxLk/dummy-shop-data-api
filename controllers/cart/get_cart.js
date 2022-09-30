import UserSchema from '../../models/user.js'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'

const getCart = async (req, res, next) => {
  const userId = req.userId
  try {
    const user = await UserSchema.findById(userId).select('-__v')
      .populate('cart.product')
      .exec()
    const cart = [...user.cart]

    res.status(200).json(cart)
  } catch (e) {
    const error = mongooseErrorHandler(e)
    next(error)
  }
}

export default getCart
