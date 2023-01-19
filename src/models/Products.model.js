const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return products;
};

const getProductsById = async (productid) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productid],
  );
  return product;
};

const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [product],
  );

  return insertId;
};

const attProduct = async (productId, att) => connection.execute(
  'UPDATE StoreManager.products set name = ? where id = ?',
  [att, productId],
);

module.exports = {
  getAllProducts,
  getProductsById,
  insert,
  attProduct,
};