const productModel = require('../models/Products')

exports.createProduct = () => {
    productModel.create();
}

