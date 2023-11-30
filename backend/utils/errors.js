class AppError extends Error {
  constructor(statusCode, message) {
    super();
    this.status = "error";
    this.statusCode = statusCode;
    this.message = message;
  }
}
const handleError = async (err, req, res, next) => {
  const { statusCode, message } = err;

  if (statusCode === 500) {
  }
  res.status(statusCode || 500).json({
    success: false,
    message: message ? message : "An error occurred",
  });
  next();
};

module.exports = {
  AppError,
  handleError,
};
