import { Review, Restaurant, User, Comment } from "../db/index.mjs";
import { runTransaction } from "../utils/runTransaction.mjs";
import { v4 as uuidv4 } from "uuid";

class ReviewService {
  static async createReview({ restaurantId, userId, text }) {
    const id = uuidv4(); // 유니크 값 부여

    // 레스토랑 아이디로 정보를 찾아 레스토랑 이름도 함께 저장
    const restaurant = await Restaurant.findById({
      id: restaurantId,
    });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!restaurant) {
      const error = new Error("해당 id와 일치하는 음식점이 없습니다.");
      error.statusCode = 400;
      throw error;
    }

    // 유저 아이디로 정보를 찾아 유저 이름도 함께 저장
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
    const createdNewReview = await Review.create({ newReview });
    createdNewReview.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewReview;
  }

  static async updateReview({ id, toUpdate }) {
    let reviewInfo = await Review.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!reviewInfo) {
      const error = new Error("해당 id를 가진 리뷰 데이터를 찾을 수 없습니다.");
      error.statusCode = 400;
      throw error;
    }

    const updatedReview = await Review.update({
      id,
      toUpdate,
    });
    return updatedReview;
  }

  static async deleteReview({ id }) {
    async function txnFunc(session) {
      await Review.delete({ id, session });
      await Comment.deleteByReviewId({ reviewId: id, session }); // 해당 리뷰의 댓글 정보 삭제

      return { status: "ok" };
    }

    // 모든 데이터 삭제 성공시 최종적으로 db에서 삭제
    const result = await runTransaction(txnFunc);
    return result;
  }

  static async findByUserId({ userId }) {
    const reviewlist = await Review.findByUserId({ userId });
    return reviewlist;
  }

  static async findByRestaurantId({ restaurantId }) {
    const reviewlist = await Review.findByRestaurantId({ restaurantId });
    return reviewlist;
  }
}

export { ReviewService };
