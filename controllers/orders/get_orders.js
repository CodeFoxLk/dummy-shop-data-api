import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'
import validationErrorHandler from '../../utils/error_handlers/validation_error_handler.js'
import Orders from '../../models/orders.js'

const getRecentOrders = async (req, res, next) => {
  const userId = req.userId

  try {
    const savedOrders = await Orders.find({ user: userId })
      .populate(
        'products.product',
        'title images thumbnail description rating'
      )
      .lean()
      .exec()

    res.status(200).json(savedOrders)
  } catch (e) {
    const error = mongooseErrorHandler(e)
    return next(error)
  }
}

export default getRecentOrders
