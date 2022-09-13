const router = require("express").Router();


const getAllProducts = require("../controllers/product_controllers/get_all_products")

router.get("/all_products", getAllProducts);

module.exports = router;
