const joi = require('joi');

const pagination = joi.object({
  page: joi.number().optional().default(1),
  size: joi.number().optional().default(10),
});

module.exports = {
  pagination,
};

