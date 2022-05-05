import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.mjs";
import { ReviewService } from "../services/reviewService.mjs";
import { body, validationResult } from "express-validator";

const reviewRouter = Router();

reviewRouter.post("/reviews", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      const error = new Error(
        "요청 내용이 빈 객체입니다. headers의 Content-Type을 application/json으로 설정해주세요",
      );
      error.statusCode = 400;
      throw error;
    }

    const userId = req.currentUserId; // 현재 로그인된 사용자 id를 추출함.
    const { restaurantId, text } = req.body;

    // 위 데이터를 db에 추가함.
    const createdNewReview = await ReviewService.createReview({
      restaurantId,
      userId,
      text,
    });

    res.status(201).json(createdNewReview);
  } catch (error) {
    next(error);
  }
});

reviewRouter.patch(
  "/reviews/:reviewId",
  login_required,
  body("text").notEmpty(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("수정하려는 리뷰 내용이 비어 있습니다.");
        error.statusCode = 400;
        throw error;
      }

      const id = req.params.reviewId;
      const toUpdate = { text: req.body.text };

      // 해당 리뷰 아이디로 리뷰 정보를 db에서 찾아 업데이트함.
      const updatedReview = await ReviewService.updateReview({
        id,
        toUpdate,
      });

      res.status(200).json(updatedReview);
    } catch (error) {
      next(error);
    }
  },
);

reviewRouter.delete(
  "/reviews/:reviewId",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.reviewId;

      // 해당 리뷰 아이디로 리뷰 정보를 db에서 찾아 삭제함.
      const result = await ReviewService.deleteReview({ id });

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  },
);

reviewRouter.get(
  "/reviewlist/user/:userId",
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.params.userId;

      // 해당 유저 아이디로 유저의 리뷰리스트를 가져옴
      const reviewlist = await ReviewService.findByUserId({ userId });

      res.status(200).send(reviewlist);
    } catch (error) {
      next(error);
    }
  },
);

reviewRouter.get(
  "/reviewlist/restaurant/:restaurantId",
  async function (req, res, next) {
    try {
      const restaurantId = req.params.restaurantId;

      // 해당 레스토랑 아이디로 레스토랑의 리뷰리스트를 가져옴
      const reviewlist = await ReviewService.findByRestaurantId({
        restaurantId,
      });

      res.status(200).send(reviewlist);
    } catch (error) {
      next(error);
    }
  },
);

export { reviewRouter };
