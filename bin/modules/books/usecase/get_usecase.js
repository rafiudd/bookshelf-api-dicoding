/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const wrapper = require('../../../utils/wrapper');
const books = require('../../../data/books');
const {BadRequestError} = require('../../../utils/error');
class GetClass {
  async getAllBooks(payload) {
    try {
      const {reading, finished, name} = payload;
      const result = [];

      if (reading === 1 || reading === 0 || finished === 1 || finished === 0 || name) {
        const filteredBooks = books.filter((book) => {
          const isReading = reading === 1 ? true : false;
          const isFinished = finished === 1 ? true : false;

          if (finished === 1 || finished === 0) {
            console.log('--------------------------');
            console.log('finished', book.id, book.finished, isFinished);
            return book.finished === isFinished;
          }

          if (reading === 1 || reading === 0) {
            console.log('--------------------------');
            console.log('reading', book.id, book.reading, isReading);
            return book.reading === isReading;
          }

          if (name) {
            console.log('--------------------------');
            console.log('name', name.toLowerCase(), book.name.toLowerCase());
            return book.name.toLowerCase().includes(name.toLowerCase());
          }

          return true;
        });

        if (filteredBooks.length > 0) {
          for (let index = 0; index < filteredBooks.length; index++) {
            result.push({
              id: filteredBooks[index].id,
              name: filteredBooks[index].name,
              author: filteredBooks[index].author,
            });
          }
        };
      } else {
        if (books.length > 0) {
          for (let index = 0; index < books.length; index++) {
            result.push({
              id: books[index].id,
              name: books[index].name,
              author: books[index].author,
            });
          }
        }
      }

      const response = {
        books: result,
      };

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
        book: getData,
      };

      return wrapper.data(response, 'Sukses mengambil data detail buku', 200);
    } catch (error) {
      return wrapper.data(error, 'Gagal mengambil data buku', 500);
    }
  }
}

module.exports = GetClass;
