/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const wrapper = require('../../../utils/wrapper');
const books = require('../../../data/books');
const {BadRequestError} = require('../../../utils/error');
class GetClass {
  async getAllBooks(payload) {
    try {
      const {reading, finished, name} = payload;
      const response = {
        books: books,
      };

      if (reading === 1 || reading === 0 || finished === 1 || finished === 0 || name) {
        const filteredBooks = books.filter((book) => {
          const isReading = reading === 1 ? true : false;
          const isFinished = finished === 1 ? true : false;

          if (finished === 1 || finished === 0) {
            return book.finished === isFinished;
          }

          if (reading === 1 || reading === 0) {
            return book.reading === isReading;
          }

          if (name) {
            return book.name.toLowerCase().includes(name.toLowerCase());
          }

          return true;
        });

        response.books = filteredBooks;
      }

      return wrapper.data(response, 'Sukses mengambil data buku', 200);
    } catch (error) {
      return wrapper.data(error, 'Gagal mengambil data buku', 500);
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
      return wrapper.data(error, 'Gagal mengambil data buku', 500);
    }
  }
}

module.exports = GetClass;
