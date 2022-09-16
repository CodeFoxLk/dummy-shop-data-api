const { validationResult } = require("express-validator");
const ProductModel = require("../../models/products");

const createNewProduct = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("validation failed");
    err.statusCode = 422;
    return next(err);
  }

  if (!req.file) {
    const err = new Error("No image provided");
    err.statusCode = 422;
    return next(err);
  }

  const product = new ProductModel({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.file.path,
    // price : req.body.price
  });

  try {
    const result = await product.save();
    res.status(201).json(result);
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

module.exports = createNewProduct;
