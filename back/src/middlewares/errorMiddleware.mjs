function errorMiddleware(error, req, res, next) {
  if (error.statusCode < 500) {
    // 로깅... Help
  } else if (error.name == "ValidationError") {
    // 로깅... Help
    error.statusCode = 422;
  } else {
    error.statusCode = 500;
  }
  console.log("\x1b[33m%s\x1b[0m", error);

  res.status(error.statusCode).send({
    msg: error.message,
    code: error.statusCode,
  });
}

export { errorMiddleware };
