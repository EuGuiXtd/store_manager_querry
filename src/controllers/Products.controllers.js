const productsService = require('../services/Products.service');

const getAllProducts = async (_req, res) => {
  const { type, message } = await productsService.getAllProducts();

  if (type) return res.status(500).json(message);

  res.status(200).json(message);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductsById(id);

  if (type) return res.status(404).json({ message });

  res.status(200).json(message);
};

module.exports = {
  getAllProducts,
  getProductsById,
};