const productModel = require('../models/Products')

exports.createProduct = (req, res, next) => {
    productModel.create();
}

