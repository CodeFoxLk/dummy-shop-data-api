import express from 'express'
const router = express.Router()
import {
  createNewProduct,
  productCreateValidations
} from '../controllers/product_controllers/create_new_product.js'
import { imageUploader } from '../utils/image_uploader.js'
import singleProduct from '../controllers/product_controllers/get_single_product.js'
import {
  getAllProducts,
  getAllProductsValidations
} from '../controllers/product_controllers/get_all_products.js'
import { getAllCategories } from '../controllers/category/get_all_categories.js'
import {
  updateProduct,
  productUpdateValidations
} from '../controllers/product_controllers/update_product.js'

import isAuth from '../middlewares/is_auth.js'
import { filterProducts, getFilterValidations } from '../controllers/product_controllers/filter_products.js'
import { addReview, validateReview } from '../controllers/reviews/add_review.js'
import { deleteReview } from '../controllers/reviews/delete_review.js'
import { addNewCategory, validateCategory } from '../controllers/category/add_new_categories.js'



//get all producta
router.get('/products', getAllProductsValidations, getAllProducts)

//get by category
router.get('/products/filter', getFilterValidations, filterProducts)

//get a product
router.get('/product/:productId', singleProduct)

//add productReview
router.post('/product/review/:productId', isAuth, validateReview, addReview)
//delete productReview
router.delete('/product/:productId/delete_review/:reviewId', isAuth, deleteReview)
//update productReview
//router.put('/product/:productId/review/:reviewId', deleteReview)

//get All Categories
router.get('/all_categories', getAllCategories)


//get All Categories
// ------------- disabled in the public api , uncommented to use
//router.get('/new_category', validateCategory, addNewCategory)


//only for update product and handle form data
//body parser is not handling formdata. therefor we need to use multer im imageUploaded.
// ------------- disabled in the public api , uncommented to use
// router.put(
//   '/update_product/:productId',
//   isAuth,
//   imageUploader,
//   productUpdateValidations,
//   updateProduct
// )


//create a product
// ------------- disabled in the public api , uncommented to use
// router.post(
//   '/create_product',
//   isAuth,
//   imageUploader,
//   productCreateValidations,
//   createNewProduct
// )


export default router
