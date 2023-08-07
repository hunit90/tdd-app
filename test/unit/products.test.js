const productController = require('../../controller/product')
const productModel = require('../../models/Products')
const httpMocks = require('node-mocks-http')
const newProduct = require('../data/new-product.json')
const allProduct = require('../data/all-products.json')
const { all } = require('../../routes')

productModel.create = jest.fn();
productModel.find = jest.fn();

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
})