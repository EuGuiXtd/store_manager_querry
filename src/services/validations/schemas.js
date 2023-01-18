const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const SaleSchema = Joi.object({
  productId: Joi.number().required().label('productId'),
  quantity: Joi.number().min(1).required().label('quantity')
.label('quantity'),
}).messages({
  'any.required': '{{#label}} is required',
  'number.min': '{{#label}} must be greater than or equal to {{#limit}}',
});

module.exports = {
  idSchema,
  SaleSchema,
};