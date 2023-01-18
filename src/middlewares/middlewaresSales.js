module.exports = async (req, res, next) => {
  const { body } = req;

  body.forEach(
     ({ productId, quantity }) => {
      if (!productId) return res.status(400).json({ message: '"productId" is required' });
      if (!quantity) return res.status(400).json({ message: '"quantity" is required' }); 
    },
  );
  next();
};