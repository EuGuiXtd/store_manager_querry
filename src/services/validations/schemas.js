const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const nameSchema = Joi.string().required().min(5).label('name')
  .messages({
  'any.required': '{{#label}} is required', 
  'string.min': '{{#label}} length must be at least {{#limit}} characters long',
});

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
  nameSchema,
};