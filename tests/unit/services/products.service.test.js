const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/Products.model');
const productsService = require('../../../src/services/Products.service')
const { products,number } = require('../models/mocks/products.model.mock');

describe('Testes de unidade do service', function () {
  describe('listagem de produtos', function () {
    it('retorna a lista completa dos produtos', async function () {
      sinon.stub(productsModel, 'getAllProducts').resolves(products);
      const result = await productsService.getAllProducts();
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(products);
    });
  });

  describe('busca de um produto pelo id', function () {
    it('retorna um erro caso receba um ID inválido', async function () {

      const result = await productsService.getProductsById('a');

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso o produto não exista', async function () {
      sinon.stub(productsModel, 'getProductsById').resolves(undefined);

      const result = await productsService.getProductsById(5);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('retorna o produto caso ID existente', async function () {
      sinon.stub(productsModel, 'getProductsById').resolves(products[0]);

      const result = await productsService.getProductsById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(products[0]);
    });

    it('Retorna um erro ao passar um nome inválido', async function () {
      const result = await productsService.createProduct(number);

      expect(result.message).to.equal("\"name\" length must be at least 5 characters long");
    })
  });

  afterEach(function () {
    sinon.restore();
  });
});