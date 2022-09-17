import express from 'express'
const router = express.Router()
import { createNewProduct, productValidations,} from '../controllers/product_controllers/create_new_product.js'
import { imageUploader } from '../utils/image_uploader.js'

//const getAllProducts = require('../controllers/product_controllers/get_all_products')


// const singleProduct = require('../controllers/product_controllers/get_single_product')
// const updateProduct = require('../controllers/product_controllers/update_product')
// const isAuth = require('../middlewares/is_auth')


// const multer = require('multer')
// const upload = multer({ dest: 'images/product_images' })

/////////////////

// router.get('/all_products', getAllProducts)
// router.get('/product/:productId', isAuth, singleProduct)
// router.put('/update_product/:productId', updateProduct)
router.post(
  '/create_product',
  imageUploader,
  productValidations,
  createNewProduct
)


export default router