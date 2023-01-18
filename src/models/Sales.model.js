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

module.exports = {
  createSale,
};