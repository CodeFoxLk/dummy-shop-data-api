import CategoryModel from '../../models/categories.js'
import mongooseErrorHandler from '../../utils/error_handlers/mongoose_error_handler.js'
import responseData from '../../utils/response_message.js'



export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find().exec()
    res.status(200).json(categories)
  } catch (e) {
    const error = mongooseErrorHandler(e)
    return next(error)
  }
}
