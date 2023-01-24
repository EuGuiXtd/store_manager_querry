const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);
const productsService = require('../../../src/services/Products.service')
const productsController = require('../../../src/controllers/Products.controllers')
const { products, product, newProduct, addNewProduct } = require('../models/mocks/products.model.mock');
const validations = require('../../../src/services/validations/validationsInputValues');

describe('Teste de unidade do Controller', function () {
  describe('Listando os produtos', function () {
    it('Deve retornar o status 200 e a lista de produtos', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getAllProducts')
        .resolves({ type: null, message: products });

      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });

  describe('Buscando um produto pelo id', function () {
    it('deve responder com 200 e os dados do produto correspondente ao id procurado', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getProductsById')
        .resolves({ type: null, message: product });

      await productsController.getProductsById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(product);
    });

    it('ao passar um id inválido deve retornar um erro', async function () {
      const res = {};
      const req = {
        params: { id: 'abc' },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getProductsById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      await productsController.getProductsById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith( {message:  '"id" must be a number'} );
    });

    it('ao passar um id que não existe no banco deve retornar um erro', async function () {
      const res = {};
      const req = {
        params: { id: 9999 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getProductsById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productsController.getProductsById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found'} );
    });
  });

  describe('Adicionando Um Novo Produto', function () { 
    it('Testa se é possivel adicionar um produto', async function () {
      const res = {};
      const req = {
        body: { "name": "Manopla Do Infinito" },
      }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'createProduct')
        .resolves({ type: null, message: newProduct })

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
    })

    it('teste se no caso de um nome com menos que 5 caracteres retorna um erro', async function () {
      const res = {};
      const req = {
        body: { "name": "Mano" },
      }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const { name } = req.body
      const error = await validations.validateName(name)
      sinon.stub(productsService, 'createProduct')
        .resolves(error)

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    })

    it('testa se envia um erro ao tentar cadastrar um produto sem nome', async function () {
      const res = {};
      const req = {
        body: {},
      }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const { name } = req.body
      const error = await validations.validateName(name)
      sinon.stub(productsService, 'createProduct')
        .resolves(error)

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' })
    })
  });

  afterEach(function () {
    sinon.restore();
  });
});