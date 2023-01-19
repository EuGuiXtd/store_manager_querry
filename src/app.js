const express = require('express');

const app = express();

const productsController = require('./controllers/Products.controllers');
const saleController = require('./controllers/Sales.controller');
const middlewaresProducts = require('./middlewares/middlewaresProducts');
/* const middlewaresSale = require('./middlewares/middlewaresSales'); */

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', productsController.getProductsById);

app.get('/products', productsController.getAllProducts);

app.post('/products', middlewaresProducts, productsController.createProduct);

app.post('/sales', saleController.createSale);

app.get('/sales', saleController.getAllSales);

app.get('/sales/:id', saleController.getSaleById);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;