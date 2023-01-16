const productsModel = require('../models/Products.model');
const validations = require('./validations/validationsInputValues');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return { type: null, message: products };
};

const getProductsById = async (productid) => {
  const error = await validations.validateId(productid);
  if (error.type) return error;

  const product = await productsModel.getProductsById(productid);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const createProduct = async (name) => {
  const newProductId = await productsModel.insert(name);
  const newProduct = await productsModel.getProductsById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
};