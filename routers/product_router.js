import express from 'express'
const router = express.Router()
import { createNewProduct, productCreateValidations} from '../controllers/product_controllers/create_new_product.js'
import { imageUploader } from '../utils/image_uploader.js'
import singleProduct from '../controllers/product_controllers/get_single_product.js'
import { getAllProducts, getAllValidations } from '../controllers/product_controllers/get_all_products.js'



// const updateProduct = require('../controllers/product_controllers/update_product')
import isAuth from '../middlewares/is_auth.js'


// const multer = require('multer')
// const upload = multer({ dest: 'images/product_images' })

/////////////////

router.get('/all_products',getAllValidations, getAllProducts)

// router.put('/update_product/:productId', updateProduct)


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