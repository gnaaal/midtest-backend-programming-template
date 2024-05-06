const joi = require('joi');

module.exports = {
  createGrocery: {
    body: {
      name_product: joi
        .string()
        .min(1)
        .max(100)
        .required()
        .label('Product Name'),
      price_product: joi.number().required().label('Price Product'),
    },
  },

  updateGrocery: {
    body: {
      name_product: joi
        .string()
        .min(1)
        .max(100)
        .required()
        .label('Product Name'),
      price_product: joi.number().required().label('Price Product'),
    },
  },
};
