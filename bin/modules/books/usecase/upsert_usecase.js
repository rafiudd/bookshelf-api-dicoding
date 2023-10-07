/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const wrapper = require('../../../utils/wrapper');
const {BadRequestError} = require('../../../utils/error');
const {nanoid} = require('nanoid');
const books = require('../../../data/books');

class UpsertClass {
  async createBook(payload) {
    try {
      const id = nanoid(16);
      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;
      let finished = false;

      if (payload.pageCount == payload.readPage) {
        finished = true;
      }

      if (payload.readPage > payload.pageCount) {
        return wrapper.error(new BadRequestError('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'), 'payload is not valid', 400);
      }

      const newData = {
        id: id,
        ...payload,
        finished: finished,
        createdAt: createdAt,
        updatedAt: updatedAt,
      };

      books.push(newData);

      const response = {
        bookId: newData.id,
      };

      return wrapper.data(response, 'Buku berhasil ditambahkan', 200);
    } catch (error) {
      return wrapper.error(new BadRequestError('Buku gagal ditambahkan'), 'Internal server error', 500);
    }
  }
}

module.exports = UpsertClass;
