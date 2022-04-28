import { Review, Restaurant, User } from "../db/index.mjs";
import { v4 as uuidv4 } from "uuid";

class reviewService {
  static createReview = async ({ restaurantId, userId, text }) => {
    // id 는 유니크 값 부여
    const id = uuidv4();
    const restaurant = await Restaurant.findById({
      restaurant_id: restaurantId,
    });
    if (!restaurant) {
      const error = new Error("해당 id와 일치하는 음식점이 없습니다.");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findById({ id: userId });

    const newReview = {
      id,
      restaurantId,
      restaurantName: restaurant.name,
      userId,
      userName: user.name,
      text,
    };

    // db에 저장
    const createdNewReview = await Review.createReview({ newReview });
    createdNewReview.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewReview;
  };

  static updateReview = async ({ id, toUpdate }) => {
    let reviewInfo = await Review.findByReviewId({ id });
    if (!reviewInfo) {
      const error = new Error("해당 id를 가진 리뷰 데이터를 찾을 수 없습니다.");
      error.statusCode = 400;
      throw error;
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
      const error = new Error("해당 id를 가진 리뷰 데이터를 찾을 수 없습니다.");
      error.statusCode = 400;
      throw error;
    }

    return { status: "ok" };
  };

  static findByUserId = async ({ userId }) => {
    const reviewlist = await Review.findByUserId({ userId });
    if (!reviewlist) {
      const error = new Error("해당 id를 가진 사용자를 찾을 수 없습니다.");
      error.statusCode = 400;
      throw error;
    }

    return reviewlist;
  };

  static findByRestaurantId = async ({ restaurantId }) => {
    const reviewlist = await Review.findByRestaurantId({ restaurantId });
    if (!reviewlist) {
      const error = new Error("해당 id를 가진 음식점을 찾을 수 없습니다.");
      error.statusCode = 400;
      throw error;
    }

    return reviewlist;
  };
}

export { reviewService };
