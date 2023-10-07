/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const wrapper = require('../../../utils/wrapper');
const books = require('../../../data/books');
const {BadRequestError} = require('../../../utils/error');

class GetClass {
  async getAllBooks() {
    try {
      const response = {
        books: books,
      };
      return wrapper.data(response, 'Sukses mengambil data buku', 200);
    } catch (error) {
      return wrapper.data(error, 'failed', 500);
    }
  }

  async getBookById(payload) {
    try {
      const getData = books.filter((n) => n.id === payload.bookId)[0];
      if (!getData) {
        return wrapper.error(new BadRequestError('Buku tidak ditemukan'), 'data not found', 404);
      }

      const response = {
        books: getData,
      };

      return wrapper.data(response, 'Sukses mengambil data buku', 200);
    } catch (error) {
      return wrapper.data(error, 'failed', 500);
    }
  }
}

module.exports = GetClass;
