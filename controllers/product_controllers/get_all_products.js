const productModel = require("../../models/products");

const getAllProducts = async (req, res, next) => {
  try {
    const productCount = await productModel.count().exec();
    const page = parseInt(req.query.page || 1);
    const countPerPage = parseInt(req.query.count || 3);

    if (!Number.isInteger(page) || page < 0) {
      throw new Error("page number not valid");
    }
    if (!Number.isInteger(countPerPage) || countPerPage < 0) {
      throw new Error("count not valid");
    }

    const allproducts = await productModel
      .find()
      .sort("-createdOn")
      .skip((page - 1) * countPerPage)
      .limit(countPerPage)
      .exec();
    res.status(200).json(allproducts);
  } catch (error) {
    return next(error);
  }
};

module.exports = getAllProducts;
