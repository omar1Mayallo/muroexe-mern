import APIError from "../utils/apiError.js";

const handleJwtInvalidError = () =>
  new APIError("Invalid token, please login again", 401);

const handleJwtExpired = () =>
  new APIError("Expired token, please login again", 401);

const sendErrorToDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

//In Production Mode show operational errors only, programming and other bugs or errors ==> let user show generic message
const sendErrorToProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("🔴ERROR🔴", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

const GlobalErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorToDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") err = handleJwtInvalidError();
    if (err.name === "TokenExpiredError") err = handleJwtExpired();

    sendErrorToProd(err, res);
  }
};

export default GlobalErrorMiddleware;
