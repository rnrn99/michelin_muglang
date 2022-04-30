function errorMiddleware(error, req, res, next) {
  if (error.statusCode < 500) {
    req.log.info(error);
  } else if (error.name == "ValidationError") {
    req.log.error(error);
    error.statusCode = 422;
  } else {
    req.log.error(error);
    error.statusCode = 500;
  }
  // console.log("\x1b[33m%s\x1b[0m", error);

  res.status(error.statusCode).send({
    msg: error.message,
    code: error.statusCode,
  });
}

export { errorMiddleware };
