class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode;
    this.status = this.hasExpectedError(statusCode);
    Error.captureStackTrace(this, this.constructor);
  }

  hasExpectedError(statusCode) {
    const expectedError = statusCode >= 400 && statusCode < 500;
    return expectedError ? 'failed' : 'error';
  }
}

module.exports = AppError;