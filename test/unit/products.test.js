const productController = require('../../controller/product')
const productModel = require('../../models/Products')
const httpMocks = require('node-mocks-http')
const newProduct = require('../data/new-product.json')
const allProduct = require('../data/all-products.json')
const { all } = require('../../routes')

productModel.create = jest.fn();
productModel.find = jest.fn();
productModel.findById = jest.fn();

const productId = '64d102d9a6150923608294be';

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn(); 
})

describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body = newProduct;
  })
  test('should have a createProduct function', () => {
    expect(typeof productController.createProduct).toBe('function')
  })

  test('should call ProductModel.create', () => {
    productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct);
  })

  test('should return 201 response code', () => {
    productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy();
  })

  test('should return json body in response', async () => {
    productModel.create.mockReturnValue(newProduct)
    await productController.createProduct(req, res, next)
    expect(res._getJSONData()).toStrictEqual(newProduct)
  })

  test('should handle errors', async() => {
    const errorMessage = { message: 'description property missing' }
    const rejectedPromise = Promise.reject(errorMessage)
    productModel.create.mockReturnValue(rejectedPromise)
    await productController.createProduct(req, res, next)
    expect(next).toBeCalledWith(errorMessage)
  })
})


describe('Product Controller Get', () => {
  test('should have a getProducts function', () => {
    expect(typeof productController.getProduct).toBe('function')
  })

  test('should call ProductModel.find({})', async () => {
    await productController.getProduct(req, res, next)
    expect(productModel.find).toHaveBeenCalledWith({})
  })

  test('should return 200 response', async () => {
    await productController.getProduct(req,res,next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled).toBeTruthy();
  })

  test('should return json body in response', async () => {
    productModel.find.mockReturnValue(allProduct)
    await productController.getProduct(req, res, next)
    expect(res._getJSONData()).toStrictEqual(allProduct)
  })

  test('should handle error', async () => {
    const errorMessage = { message: "Error finding product data" }
    const rejectedPromise = Promise.reject(errorMessage)
    productModel.find.mockReturnValue(rejectedPromise)
    await productController.getProduct(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })

  describe('Product Controller GetById', () => {
    test('should have a getProductById', () => {
      expect(typeof productController.getProductById).toBe('function')
    })

    test('should call productModel.findById', async() => {
      req.params.productId = productId
      await productController.getProductById(req, res, next)
      expect(productModel.findById).toBeCalledWith(productId)
    })

    test('should return json body and reponse code 200', async() => {
      productModel.findById.mockReturnValue(newProduct)
      await productController.getProductById(req, res, next)
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toStrictEqual(newProduct)
      expect(res._isEndCalled()).toBeTruthy()
    })

    test('should return 404 when item doesnt exist', async () => {
      productModel.findById.mockReturnValue(null);
      await productController.getProductById(req, res, next)
      expect(res.statusCode).toBe(404)
      expect(res._isEndCalled()).toBeTruthy()
    })

    test('should handle error', async () => {
      const errorMessage = { message: 'error' }
      const rejectedPromise = Promise.reject(errorMessage)
      productModel.findById.mockReturnValue(rejectedPromise)
      await productController.getProductById(req, res, next)
      expect(next).toHaveBeenCalledWith(errorMessage)
    })
  })
})