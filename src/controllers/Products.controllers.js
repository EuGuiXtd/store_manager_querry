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

const createProduct = async (req, res) => {
  const { body } = req;
  const { name } = body;

  const { status, message } = await productsService.createProduct(name);

  if (status) {
    res.status(status).json({ message });
  } else { res.status(201).json(message); }
};

const attProduct = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const { name } = body;

  const { message, status } = await productsService.attProduct(id, name);

  if (status) {
    res.status(status).json({ message });
  } else { res.status(200).json(message); }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProduct(id);

  if (type) return res.status(404).json({ message });

  res.status(204).send();
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  attProduct,
  deleteProduct,
};