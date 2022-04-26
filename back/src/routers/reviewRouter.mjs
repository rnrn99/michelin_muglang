import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.mjs";
import { reviewService } from "../services/reviewService.mjs";

const reviewRouter = Router();
reviewRouter.use(login_required);

reviewRouter.post("/review/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "요청 내용이 빈 객체입니다. headers의 Content-Type을 application/json으로 설정해주세요",
      );
    }

    const userId = req.currentUserId;
    const { restaurantId, userName, text } = req.body;

    const createdNewReview = await reviewService.createReview({
      restaurantId,
      userId,
      userName,
      text,
    });

    res.status(201).json(createdNewReview);
  } catch (error) {
    next(error);
  }
});

reviewRouter.put("/review/:reviewId", async function (req, res, next) {
  try {
    const id = req.params.reviewId;
    const { text } = req.body ?? null;
    const toUpdate = { text };

    const updatedReview = await reviewService.updateReview({
      id,
      toUpdate,
    });

    if (updatedReview.errorMessage) {
      throw new Error(updatedReview.errorMessage);
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
});

reviewRouter.delete("/review/:reviewId", async function (req, res, next) {
  try {
    const id = req.params.reviewId;

    const result = await reviewService.deleteReview({ id });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

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

reviewRouter.get("/reviewlist/user/:userId", async function (req, res, next) {
  try {
    const userId = req.params.userId;

    const reviewlist = await reviewService.findByUserId({ userId });

    res.status(200).send(reviewlist);
  } catch (error) {
    next(error);
  }
});

export { reviewRouter };
