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

  static async update({ id, toUpdate }) {
    const filter = { id };
    const option = { returnOriginal: false };
    const updatedReview = ReviewModel.findOneAndUpdate(
      filter,
      toUpdate,
      option,
    );

    return updatedReview;
  }

  static async delete({ id, session }) {
    const result = await ReviewModel.deleteOne({ id }).session(session);
    // returns: { "acknowledged" : true, "deletedCount" : 1 }
    const isDataDeleted = result.deletedCount === 1;
    return isDataDeleted;
  }

  static async findByUserId({ userId }) {
    const reviewlist = await ReviewModel.find({ userId });
    return reviewlist;
  }

  static findByRestaurantId = async ({ restaurantId }) => {
    const reviewlist = await ReviewModel.find({ restaurantId }).populate(
      "comments",
    );
    return reviewlist;
  };

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
  static async deleteByUserId({ userId, commentList, session }) {
    await ReviewModel.deleteMany({ userId }).session(session);

    await ReviewModel.updateMany(
      { comments: { $in: commentList } },
      { $pull: { comments: { $in: commentList } } },
      { returnOriginal: false },
    ).session(session);

    return { status: "ok" };
  }

  static async addComment({ id, commentId }) {
    const filter = { id };
    const update = { $push: { comments: commentId } };
    const option = { returnOriginal: false };

    const updatedReview = await ReviewModel.findOneAndUpdate(
      filter,
      update,
      option,
    );
    return updatedReview;
  }

  static async deleteComment({ id, commentId, session }) {
    const filter = { id };
    const update = { $pull: { comments: commentId } };
    const option = { returnOriginal: false };

    const updatedReview = await ReviewModel.findOneAndUpdate(
      filter,
      update,
      option,
    ).session(session);
    return updatedReview;
  }

  static async deleteCommentByUserId({ commentList, session }) {
    const filter = { comments: { $in: commentList } };
    const update = { $pull: { comments: { $in: commentList } } };
    const option = { returnOriginal: false };

    const updatedReviews = await ReviewModel.updateMany(
      filter,
      update,
      option,
    ).session(session);
    return updatedReviews;
  }
}

export { Review };
