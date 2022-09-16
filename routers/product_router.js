const router = require("express").Router();
const {body} = require("express-validator");


const getAllProducts = require("../controllers/product_controllers/get_all_products");
const createProduct = require("../controllers/product_controllers/create_new_product");
const singleProduct = require("../controllers/product_controllers/get_single_product");
const updateProduct = require("../controllers/product_controllers/update_product");
const isAuth = require("../middlewares/is_auth");
const imageUploader  = require("../middlewares/image_uploader");


router.get("/all_products", getAllProducts);
router.get("/product/:productId", isAuth, singleProduct);
router.put('/update_product/:productId', updateProduct)
router.post("/create_product", 
// [
//     body('title')
//     .trim()
//     .isLength({ min: 5 }),
// ] , 
createProduct);

module.exports = router;
