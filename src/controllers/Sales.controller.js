const saleService = require('../services/Sale.service');

const createSale = async (req, res) => {
    const { body } = req;
  const { message, status, type } = await saleService.createSale(body);
  console.log(type);
  if (type) {
    return res.status(404).json({ message });
  }
  if (status) {
    res.status(status).json({ message });
  } else { res.status(201).json(message); } 
};

const getAllSales = async (_req, res) => {
  const { type, message } = await saleService.getAllSales();

  if (type) return res.status(500).json(message);

  res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, sale, message } = await saleService.getSaleById(id);

  if (type) return res.status(404).json({ message });

  res.status(200).json(sale);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};