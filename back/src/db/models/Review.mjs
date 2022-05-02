import { ReviewModel } from "../schemas/review.mjs";

class Review {
  static create = async ({ newReview }) => {
    const createdNewReview = await ReviewModel.create(newReview);
    return createdNewReview;
  };

  static findById = async ({ id }) => {
    const reviewInfo = await ReviewModel.findOne({ id });
    return reviewInfo;
  };

  static update = async ({ id, toUpdate }) => {
    const filter = { id };
    const option = { returnOriginal: false };
    const updatedReview = await ReviewModel.findOneAndUpdate(
      filter,
      toUpdate,
      option,
    );
    return updatedReview;
  };

  static delete = async ({ id }) => {
    const result = await ReviewModel.deleteOne({ id });
    // returns: { "acknowledged" : true, "deletedCount" : 1 }
    const isDataDeleted = result.deletedCount === 1;
    return isDataDeleted;
  };

  static findByUserId = async ({ userId }) => {
    const reviewlist = await ReviewModel.find({ userId });
    return reviewlist;
  };

  static findByRestaurantId = async ({ restaurantId }) => {
    const reviewlist = await ReviewModel.find({ restaurantId });
    return reviewlist;
  };

  // 유저 이름 수정 시, 리뷰 데이터도 업데이트
  static updateUserName = async ({ userId, userName }) => {
    const filter = { userId };
    const update = { userName };
    const option = { returnOriginal: false };

    const updatedReviews = await ReviewModel.updateMany(filter, update, option);
    return updatedReviews;
  };

  // 회원 탈퇴 시, 리뷰 데이터 삭제
  static deleteByUserId = async ({ userId }) => {
    const result = await ReviewModel.deleteMany({ userId });
    return result;
  };
}

export { Review };
