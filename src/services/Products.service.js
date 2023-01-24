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
  const error = await validations.validateName(name);
  if (error) return error;
  console.log(name);
  const newProductId = await productsModel.insert(name);
  const newProduct = await productsModel.getProductsById(newProductId);

  return { type: null, message: newProduct };
};

const attProduct = async (productId, att) => {
  const error = await validations.validateName(att);
  if (error) return error;

  const product = await productsModel.getProductsById(productId);
  if (!product) return { status: 404, message: 'Product not found' };
  
  await productsModel.attProduct(productId, att);
  const newProduct = await productsModel.getProductsById(productId);
  return { type: null, message: newProduct };
};

const deleteProduct = async (productId) => {
  const product = await productsModel.getProductsById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productsModel.deleteProduct(productId);
  return { type: null, message: null };
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  attProduct,
  deleteProduct,
};