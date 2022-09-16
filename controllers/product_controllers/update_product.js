const productModel = require("../../models/products");
const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");

const updateProduct = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("validation failed");
    err.statusCode = 422;
    return next(err);
  }

  const productId = req.params.productId;
  const updateProduct = {
    title: req.body.title,
  };

  // is file available
  let imageAvailable = req.file ? true : false;
  if (imageAvailable) {
    updateProduct.imageUrl = req.file.path;
  }

  try {
    const oldProduct = await productModel.findByIdAndUpdate(
      productId,
      updateProduct
    ).exec();
    //remove the old image
    if (imageAvailable) {
      _removeImage(oldProduct.imageUrl);
    }
    res.status(200).json(oldProduct);
  } catch (error) {
    return next(new error());
  }
};

const _removeImage = (filePath) => {
  filePath = path.join(__dirname, "..", "..", filePath);
  fs.unlink(filePath, (err) => {});
};

module.exports = updateProduct;
