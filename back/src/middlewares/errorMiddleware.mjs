function errorMiddleware(error, req, res, next) {
  if (error.statusCode < 500) {
    // 로깅... Help
  } else if (error.name == "ValidationError") {
    // 로깅... Help
    error.message = "빈 요청이 포함되어 있습니다.";
    error.statusCode = 400;
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
