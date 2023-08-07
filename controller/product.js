const productModel = require('../models/Products')

exports.createProduct = async (req, res, next) =>{
  try {
    const createProduct = await productModel.create(req.body)
    console.log('createProduct', createProduct)
    res.status(201).json(createProduct)
  } catch (error) {
    next(error)
  }
  
}
