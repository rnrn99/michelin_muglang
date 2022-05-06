import { ReviewModel } from "../schemas/review.mjs";

class Review {
  static createReview = async ({ newReview }) => {
    const createdNewReview = await ReviewModel.create(newReview);
    return createdNewReview;
  };

  static findByReviewId = async ({ id }) => {
    const reviewInfo = await ReviewModel.findOne({ id }).lean();
    return reviewInfo;
  };

  static updateReview = async ({ id, toUpdate }) => {
    const filter = { id };
    const option = { returnOriginal: false };
    const updatedReview = await ReviewModel.findOneAndUpdate(
      filter,
      toUpdate,
      option,
    ).lean();
    return updatedReview;
  };

  static deleteReview = async ({ id }) => {
    const deleteResult = await ReviewModel.deleteOne({ id });
    // returns: { "acknowledged" : true, "deletedCount" : 1 }
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  };

  static findByUserId = async ({ userId }) => {
    const reviewlist = await ReviewModel.find({ userId }).lean();
    return reviewlist;
  };

  static findByRestaurantId = async ({ restaurantId }) => {
    const reviewlist = await ReviewModel.find({ restaurantId }).lean();
    return reviewlist;
  };
}

export { Review };
