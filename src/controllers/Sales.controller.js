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

module.exports = {
  createSale,
};