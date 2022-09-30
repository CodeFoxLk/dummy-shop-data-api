import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'
import validationErrorHandler from '../../utils/error_handlers/validation_error_handler.js'
import Orders from '../../models/orders.js'
import Products from '../../models/products.js'
import { body, check } from 'express-validator'
import { ErrorMessages } from '../../const/response_messages.js'

export const purchaseProducts = async (req, res, next) => {
  const products = req.body.products
  const address = req.body.address
  const mobile = req.body.mobile_number

  const err = validationErrorHandler(req)
  if (err) {
    return next(err)
  }

  try {
    const savedProducts = await Products.find({ _id: { $in: products } })
      .select('price discount')
      .lean()
      .exec()

    savedProducts.forEach((p) => {
      p.product = p._id
      p.netPuchasedPrice = p.price * (1 - (p.discount ?? 1))
      p.puchasedPrice = p.price
      p.discounted = p.discount
    })

    const order = new Orders({
      user: req.userId,
      products: savedProducts,
      address: address,
      mobileNumber: mobile
    })
    const savedOrder = order.save()
    res.status(200).json(order)
  } catch (e) {
    const error = mongooseErrorHandler(e)
    return next(error)
  }
}

export const purchaseValidations = [
  body('address')
    .trim()
    .notEmpty()
    .isLength({ max: 400 }),
  body('mobile_number', ErrorMessages.INVALID_MOBILE)
    .trim()
    .isMobilePhone()

  // body('createdBy')
  //   .notEmpty()
  //   .custom((value, { req }) => {}),
]
