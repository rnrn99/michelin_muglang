import { ReviewModel } from "../schemas/review.mjs";

class Review {
  static async create({ newReview }) {
    const createdNewReview = await ReviewModel.create(newReview);
    return createdNewReview;
  }

  static async findById({ id }) {
    const reviewInfo = await ReviewModel.findOne({ id });
    return reviewInfo;
  }

  static async update({ id, toUpdate, session }) {
    const filter = { id };
    const option = { returnOriginal: false };
    const updatedReview =
      session === undefined
        ? await ReviewModel.findOneAndUpdate(filter, toUpdate, option)
        : await ReviewModel.findOneAndUpdate(filter, toUpdate, option).session(
            session,
          );

    return updatedReview;
  }

  static async delete({ id }) {
    const result = await ReviewModel.deleteOne({ id });
    // returns: { "acknowledged" : true, "deletedCount" : 1 }
    const isDataDeleted = result.deletedCount === 1;
    return isDataDeleted;
  }

  static async findByUserId({ userId }) {
    const reviewlist = await ReviewModel.find({ userId });
    return reviewlist;
  }

  static async findByRestaurantId({ restaurantId }) {
    const reviewlist = await ReviewModel.find({ restaurantId });
    return reviewlist;
  }

  // 유저 이름 수정 시, 리뷰 데이터도 업데이트
  static async updateUserName({ userId, userName, session }) {
    const filter = { userId };
    const update = { userName };
    const option = { returnOriginal: false };

    const updatedReviews = await ReviewModel.updateMany(
      filter,
      update,
      option,
    ).session(session);
    return updatedReviews;
  }

  // 회원 탈퇴 시, 리뷰 데이터 삭제
  static async deleteByUserId({ userId, session }) {
    const result = await ReviewModel.deleteMany({ userId }).session(session);
    return result;
  }
}

export { Review };
