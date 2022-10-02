import { SuccessResponseMessages } from '../../const/response_messages.js'
import UserSchema from '../../models/user.js'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'

const getProfile = async (req, res, next) => {
  const userId = req.userId
  try {
    const user = await UserSchema.findById(userId)
      .select('-__v -password')
      .populate('cart.product')
      .exec()

    res.status(200).json(user)
  } catch (e) {
    const error = mongooseErrorHandler(e)
    next(error)
  }
}

export default getProfile
