import cors from "cors";
import express from "express";
import logger from "pino-http";
import { errorMiddleware } from "./middlewares/errorMiddleware.mjs";
import { userAuthRouter } from "./routers/userRouter.mjs";
import { restaurantRouter } from "./routers/restaurantRouter.mjs";
import { mapRouter } from "./routers/mapRouter.mjs";
import { graphRouter } from "./routers/graphRouter.mjs";
import { reviewRouter } from "./routers/reviewRouter.mjs";
import { googleRouter } from "./routers/googleRouter.mjs";
import { commentRouter } from "./routers/commentRouter.mjs";

const app = express();
const pinoLogger = logger({
  // quietReqLogger: true, // get request ID
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: true,
      ignore: "req",
      destination: "./pino-logger.log", // 배포시 사용: 해당 파일에 로그 기록
    },
  },
  autoLogging: false,
  serializers: {
    err(error) {
      return {
        stack: error.stack,
        statusCode: error.statusCode,
      };
    },
  },
});

// CORS 에러 방지
app.use(cors());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(pinoLogger);

// 기본 페이지
app.get("/", (req, res) => {
  req.log.info("Welcome to michelin muglang"); // 로거 확인용
  res.send("Welcome to michelin muglang!");
});

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use(userAuthRouter);
app.use(mapRouter);
app.use(restaurantRouter);
app.use(graphRouter);
app.use(reviewRouter);
app.use(googleRouter);
app.use(commentRouter);

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

export { app };
