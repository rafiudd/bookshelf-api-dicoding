/* eslint-disable max-len */
const data = (data, description = '', code = 200) => ({err: null, message: description, data, code});

const paginationData = (data, meta) => ({err: null, data, meta});

const error = (err, description, code) => ({err, code, data: '', message: description});

const response = (res, type, result, message = '') => {
  const objResponse = {
    status: type,
    data: result.data,
  };

  if (type == 'fail') {
    delete objResponse.data;
    objResponse.message = result.err.message;
  }

  return res.response(objResponse).code(result.code);
};

const paginationResponse = (res, type, result, message = '', code = 200) => {
  let status = true;
  let data = result.data;
  if (type === 'fail') {
    status = false;
    data = '';
    message = result.message;
  }
  res.response(code,
      {
        success: status,
        data,
        meta: result.meta,
        code,
        message,
      },
  );
};

module.exports = {
  data,
  paginationData,
  error,
  response,
  paginationResponse,
};

