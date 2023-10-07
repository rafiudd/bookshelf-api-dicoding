/* eslint-disable require-jsdoc */
const wrapper = require('../../../utils/wrapper');
const books = require('../../../data/books');

class GetClass {
  async getAllBooks() {
    try {
      const response = {
        books: books,
      };
      return wrapper.data(response, 'success create note', 200);
    } catch (error) {
      return wrapper.data(error, 'failed', 500);
    }
  }
}

module.exports = GetClass;
