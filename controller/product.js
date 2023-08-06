const productModel = require('../models/Products')

exports.createProduct = async (req, res, next) =>{
  const createProduct = await productModel.create(req.body)
  console.log('createProduct', createProduct)
  res.status(201).json(createProduct)
}
