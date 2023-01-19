const connection = require('./connection');

const createSale = async (body) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUE ()',
  );
  await Promise.all(body.map(
    async ({ productId, quantity }) => {
      console.log(insertId, productId, quantity);
      await connection
        .execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?,?,?)',
          [insertId, productId, quantity]);
    },
  ));
  return { id: insertId, itemsSold: body };
};

const getAllSales = async () => {
  const [sales] = await connection.execute(
    'SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity '
    + 'FROM StoreManager.sales_products as sp '
    + 'join StoreManager.sales as s on sp.sale_id = s.id order by sale_id, product_id; ',
  );
  return sales;
};

const getSaleById = async (id) => {
  const [sale] = await connection.execute(
    'SELECT s.date, sp.product_id AS productId, sp.quantity '
    + 'FROM StoreManager.sales_products as sp '
    + 'JOIN StoreManager.sales as s '
    + 'on sp.sale_id = s.id WHERE sp.sale_id = ? ORDER BY sp.sale_id, sp.product_id',
    [id],
  );
  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};