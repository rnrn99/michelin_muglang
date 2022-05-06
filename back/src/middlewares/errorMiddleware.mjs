function errorMiddleware(error, req, res, next) {
  if (error.statusCode < 500) {
    req.log.info(error);
  } else if (error.name == "ValidationError") {
    error.statusCode = 422;
    req.log.error(error);
  } else {
    error.statusCode = 500;
    req.log.error(error);
  }

  res.status(error.statusCode).send({
    msg: error.message,
    code: error.statusCode,
  });
}

export { errorMiddleware };

/** logger 사용 시, 한글이 깨질 경우 참고
 * cmd 터미널에 `chcp 65001` 입력 => 인코딩 형식을 'utf-8'로 임시로 변경해줌 *그 창에서만 적용
 * https://github.com/pinojs/pino/blob/master/docs/help.md#unicode-and-windows-terminal
 *
 * git bash의 경우 git bash 옵션의 인코딩 형식을 'utf-8'로 변경해주어야 함
 * https://recoveryman.tistory.com/328
 */
