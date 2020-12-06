const winston = require('winston');
const multer = require('multer');

module.exports = function (err, req, res, next) {
  winston.error(err.message, err);

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      err.message = `Invalid fieldname ${err.field}`;
      err.statusCode = 400;
      err.status = 'failed';
    }
  } else {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  }

  // error
  // warn
  // info
  // verbose
  // debug 
  // silly

  res.status(err.statusCode).send(err.message);
}