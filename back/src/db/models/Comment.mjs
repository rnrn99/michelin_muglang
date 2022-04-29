import { CommentModel } from "../schemas/comment.mjs";
import { ReviewModel } from "../schemas/review.mjs";

class Comment {
  static createComment = async ({ newComment }) => {
    const createdNewComment = await CommentModel.create(newComment);
    const updatedReview = await ReviewModel.findOneAndUpdate(
      { id: newComment.reviewId },
      { $push: { comments: createdNewComment._id } },
      { returnOriginal: false },
    );
    // console.log(updatedReview);
    return createdNewComment;
  };

  static findByCommentId = async ({ id }) => {
    const CommentInfo = await CommentModel.findOne({ _id: id });
    return CommentInfo;
  };

  static updateComment = async ({ id, toUpdate }) => {
    const filter = { _id: id };
    const option = { returnOriginal: false };
    const updatedComment = await CommentModel.findOneAndUpdate(
      filter,
      toUpdate,
      option,
    );
    return updatedComment;
  };

  static deleteComment = async ({ id }) => {
    const deleteResult = await CommentModel.deleteOne({ _id: id });
    // returns: { "acknowledged" : true, "deletedCount" : 1 }
    const isDataDeleted = deleteResult.deletedCount === 1;
    const updatedReview = await ReviewModel.findOneAndUpdate(
      { _id: id },
      { $pull: { comments: id } },
      { returnOriginal: false },
    );
    // console.log(updatedReview);
    return isDataDeleted;
  };
}

export { Comment };
