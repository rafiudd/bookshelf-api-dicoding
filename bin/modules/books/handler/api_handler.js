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

const handlers = [
  {
    method: 'POST',
    path: '/book',
    handler: createBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
];

module.exports = handlers;
