const productModel = require('../models/Products')

exports.createProduct = async (req, res, next) =>{
  try {
    const createProduct = await productModel.create(req.body)
    res.status(200).json(createProduct)
  } catch (error) {
    next(error)
  }
  
}
