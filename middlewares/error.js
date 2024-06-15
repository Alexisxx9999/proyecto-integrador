const { ValidationError } = require('sequelize');

function logErrors(err, req, res, next) {
  console.log('log errors');
  console.error(err);
  next(err);
}
/* middleware de tipo error */
function errorHandler(err, req, res, next) {
  console.log('error handler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}
/* cannot: set headersafter they to the client */
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}
function ormError(err, re, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      error: err.errors,
    });
  }
}
module.exports = { logErrors, errorHandler, boomErrorHandler, ormError };
