const salesModel = require('../models/Sales.model');
const validateSale = require('./validations/validationsInputValues');
const productsModel = require('../models/Products.model');

const createSale = async (body) => {
  const products = await productsModel.getAllProducts();
  const lastId = products.at(-1).id;
  console.log(lastId);
  console.log(products);

  const verifyProductId = body
    .some((id) => id.productId > lastId);
  console.log(verifyProductId);
  if (verifyProductId) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const error = await validateSale.validateSale(body);
  if (error) return error;

  const newSale = await salesModel.createSale(body);
  return { type: null, message: newSale };
};

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return { type: null, message: sales };
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  console.log(sale);
  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, sale };
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};