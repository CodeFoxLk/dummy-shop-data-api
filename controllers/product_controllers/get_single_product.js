import productModel from "../../models/products.js";

export default (async (req, res, next) => {
    const productId = req.params.productId
    try {
        const product = await productModel.findById(productId).exec()
        res.status(200).json(product);
    } catch (error) {
        return next(new error)
    }
});
