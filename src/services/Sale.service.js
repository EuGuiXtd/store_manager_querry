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

module.exports = {
  createSale,
};