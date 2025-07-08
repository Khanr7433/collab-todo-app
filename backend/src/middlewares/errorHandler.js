import ApiError from "../utils/apiError.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  // If it's not an ApiError, convert it to one
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, [], err.stack);
  }

  // Prepare the response
  const response = {
    success: false,
    message: error.message,
    statusCode: error.statusCode,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    ...(error.errors.length > 0 && { errors: error.errors }),
  };

  // Log the error in development
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }

  // Send JSON response
  res.status(error.statusCode).json(response);
};

export default errorHandler;
