const joi = require('joi');

const pagination = joi.object({
  finished: joi.number().optional(),
  reading: joi.number().optional(),
  name: joi.string().optional(),
});

const bookId = joi.object({
  bookId: joi.string().required(),
});

module.exports = {
  pagination,
  bookId,
};

