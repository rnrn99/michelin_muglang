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

  static findByUserId = async ({ userId }) => {
    const CommentInfo = await CommentModel.find(
      { userId },
      { reviewId: 0, userId: 0, userName: 0, text: 0 }, // _id 만 반환
    );

    return CommentInfo;
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

  static async deleteByReviewId({ reviewId, session }) {
    const result = await CommentModel.deleteMany({ reviewId }).session(session);
    return result;
  }

  static async deleteByUserId({ userId, session }) {
    await CommentModel.deleteMany({ userId }).session(session);
    return { status: "ok" };
  }
}

export { Comment };
