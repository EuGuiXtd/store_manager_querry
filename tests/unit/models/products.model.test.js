const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/Products.model');
const connection = require('../../../src/models/connection')
const { products, newProduct, addNewProduct } = require('./mocks/products.model.mock');

describe('Testes de unidade do model', function () {
  it('Recuperando a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productsModel.getAllProducts();
    expect(result).to.be.deep.equal(products);
  });

  it('Recuperando um produto a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    const result = await productsModel.getProductsById(1);
    expect(result).to.be.deep.equal(products[0]);
  });

  it('Criando um produto', async function () {
    const insertId = 4
    sinon.stub(connection, 'execute').resolves([{insertId}]);
    const result = await productsModel.insert(addNewProduct);
    expect(result).to.be.deep.equal(4);
  });


  afterEach(function () {
    sinon.restore();
  });
});