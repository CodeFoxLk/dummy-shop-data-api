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
  getAllValidations
} from '../controllers/product_controllers/get_all_products.js'
import { getAllCategories } from '../controllers/category/get_all_categories.js'
import {
  updateProduct,
  productUpdateValidations
} from '../controllers/product_controllers/update_product.js'

//only for update product and handle form data
//body parser is not handling for data. therefor we need to use multer
//import multer from 'multer';

// const updateProduct = require('../controllers/product_controllers/update_product')
import isAuth from '../middlewares/is_auth.js'

//get All Categories
router.get('/all_categories', getAllCategories)

//get all producta
router.get('/all_products', getAllValidations, getAllProducts)

router.put('/update_product/:productId', productUpdateValidations, imageUploader, updateProduct)

//get a product
router.get('/product/:productId', singleProduct)

//create a product
router.post(
  '/create_product',
  imageUploader,
  productCreateValidations,
  createNewProduct
)

export default router
