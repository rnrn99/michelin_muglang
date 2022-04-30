import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.mjs";
import { reviewService } from "../services/reviewService.mjs";
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

    const userId = req.currentUserId;
    const { restaurantId, text } = req.body;

    const createdNewReview = await reviewService.createReview({
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
        const error = new Error("요청 내용이 비어 있습니다.");
        error.statusCode = 400;
        throw error;
      }

      const id = req.params.reviewId;
      const toUpdate = { text: req.body.text };

      const updatedReview = await reviewService.updateReview({
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
      const result = await reviewService.deleteReview({ id });
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
      const reviewlist = await reviewService.findByUserId({ userId });
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
      const reviewlist = await reviewService.findByRestaurantId({
        restaurantId,
      });

      res.status(200).send(reviewlist);
    } catch (error) {
      next(error);
    }
  },
);

export { reviewRouter };
