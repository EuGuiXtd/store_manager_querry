const Joi = require('joi');
const schemas = require('./schemas');

const validateId = (id) => {
  const { error } = schemas.idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateSale = (body) => {
  const arraySaleSchema = Joi.array().items(schemas.SaleSchema);
  const { error } = arraySaleSchema.validate(body);
  if (error) {
    console.log('123', error.details[0].type);
    let status;
    if (error.details[0].type === 'number.min') {
      status = 422;
    } else {
      status = 400;
    }
    return { status, message: error.message };
  }
};

module.exports = {
  validateId,
  validateSale,
};