

const Joi = require('joi');

const createShortUrlSchema = Joi.object({
  url: Joi.string().uri().required(),
  validity: Joi.number().integer().min(1).optional(),
  shortcode: Joi.string().alphanum().min(4).max(10).optional(),
});

module.exports = { createShortUrlSchema };
