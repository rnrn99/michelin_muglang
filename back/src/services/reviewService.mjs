import { Review } from "../db/models/Review.mjs";
import { v4 as uuidv4 } from "uuid";

class reviewService {
  static createReview = async ({ restaurantId, userId, userName, text }) => {
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newReview = { id, restaurantId, userId, userName, text };

    // db에 저장
    const createdNewReview = await Review.createReview({ newReview });
    createdNewReview.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewReview;
  };

  static updateReview = async ({ id, toUpdate }) => {
    let reviewInfo = await Review.findByReviewId({ id });
    if (!reviewInfo) {
      const errorMessage =
        "해당 id를 가진 리뷰 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const updatedReview = await Review.updateReview({
      id,
      toUpdate,
    });
    return updatedReview;
  };

  static deleteReview = async ({ id }) => {
    const isDataDeleted = await Review.deleteReview({ id });
    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 리뷰 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  };

  static findByUserId = async ({ userId }) => {
    const reviewlist = await Review.findByUserId({ userId });
    return reviewlist;
  };

  static findByRestaurantId = async ({ restaurantId }) => {
    const reviewlist = await Review.findByRestaurantId({ restaurantId });
    return reviewlist;
  };
}

export { reviewService };
