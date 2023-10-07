/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const GetClass = require('../usecase/get_usecase');
const UpsertClass = require('../usecase/upsert_usecase');
const getUsecase = new GetClass();
const upsertUsecase = new UpsertClass();

const wrapper = require('../../../utils/wrapper');
const validator = require('../../../utils/validator');
const commandModel = require('../domain/command_model');
const queryModel = require('../domain/query_model');

async function createBook(req, res) {
  const payload = {
    ...req.payload,
  };

  const validatePayload = validator.isValidPayload(payload, commandModel.createBookModel);

  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return upsertUsecase.createBook(result.data);
  };

  const sendResponse = async (result) => {
    if (result.err) {
      return wrapper.response(res, 'fail', result, result.message);
    }

    return wrapper.response(res, 'success', result, result.message, 200);
  };
  return sendResponse(await postRequest(validatePayload));
};

async function updateBook(req, res) {
  const payload = {
    ...req.params,
    ...req.payload,
  };

  const validatePayload = validator.isValidPayload(payload, commandModel.updateBookModel);

  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    console.log(result, 'result');
    return upsertUsecase.updateBook(result.data);
  };

  const sendResponse = async (result) => {
    if (result.err) {
      return wrapper.response(res, 'fail', result, result.message);
    }

    return wrapper.response(res, 'success', result, result.message, 200);
  };
  return sendResponse(await postRequest(validatePayload));
};

async function getAllBooks(req, res) {
  const payload = {
    ...req.payload,
  };

  const validatePayload = validator.isValidPayload(payload, queryModel.pagination);

  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return getUsecase.getAllBooks(result.data);
  };

  const sendResponse = async (result) => {
    if (result.err) {
      return wrapper.response(res, 'fail', result, result.message);
    }

    return wrapper.response(res, 'success', result, result.message, 200);
  };
  return sendResponse(await postRequest(validatePayload));
};

async function getBookById(req, res) {
  const payload = {
    ...req.params,
  };

  const validatePayload = validator.isValidPayload(payload, queryModel.bookId);

  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return getUsecase.getBookById(result.data);
  };

  const sendResponse = async (result) => {
    if (result.err) {
      return wrapper.response(res, 'fail', result, result.message);
    }

    return wrapper.response(res, 'success', result, result.message, 200);
  };
  return sendResponse(await postRequest(validatePayload));
};

const handlers = [
  {
    method: 'POST',
    path: '/books',
    handler: createBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook,
  },
];

module.exports = handlers;
