import { CommentModel } from "../schemas/comment.mjs";

class Comment {
  static create = async ({ newComment }) => {
    const createdNewComment = await CommentModel.create(newComment);
    return createdNewComment;
  };

  static findById = async ({ id }) => {
    const CommentInfo = await CommentModel.findOne({ _id: id });
    return CommentInfo;
  };

  static update = async ({ id, toUpdate }) => {
    const filter = { _id: id };
    const option = { returnOriginal: false };
    const updatedComment = await CommentModel.findOneAndUpdate(
      filter,
      toUpdate,
      option,
    );
    return updatedComment;
  };

  static delete = async ({ id, session }) => {
    const deleteResult = await CommentModel.deleteOne({ _id: id }).session(
      session,
    );
    // returns: { "acknowledged" : true, "deletedCount" : 1 }
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  };

  static async updateUserName({ userId, userName, session }) {
    const filter = { userId };
    const update = { userName };
    const option = { returnOriginal: false };

    const updatedComments = await CommentModel.updateMany(
      filter,
      update,
      option,
    ).session(session);
    return updatedComments;
  }

  // 리뷰 삭제 시, 댓글 데이터 삭제
  static async deleteByReviewId({ reviewId, session }) {
    const result = await CommentModel.deleteMany({ reviewId }).session(session);
    return result;
  }

  static async deleteByUserId({ userId, session }) {
    const result = await CommentModel.deleteMany({ userId }).session(session);
    return result;
  }
}

export { Comment };
