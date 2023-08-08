const express = require('express')
const router = express.Router()
const productController = require('./controller/product')

router.post('/', productController.createProduct)
router.get('/', productController.getProduct)
router.get('/:productId', productController.getProductById)

module.exports = router