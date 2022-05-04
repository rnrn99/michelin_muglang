import { Comment, Review, User, mongodb } from "../db/index.mjs";

class CommentService {
  static async createComment({ reviewId, userId, text }) {
    const review = await Review.findById({
      id: reviewId,
    });
    if (!review) {
      const error = new Error("해당 id와 일치하는 리뷰가 없습니다.");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findById({ id: userId });

    const newComment = {
      reviewId,
      userId,
      userName: user.name,
      text,
    };

    // db에 저장
    const createdNewComment = await Comment.create({ newComment });
    createdNewComment.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    // 리뷰 데이터 업데이트
    await Review.addComment({
      id: reviewId,
      commentId: createdNewComment._id,
    });

    return createdNewComment;
  }

  static async updateComment({ id, toUpdate }) {
    let CommentInfo = await Comment.findById({ id });
    if (!CommentInfo) {
      const error = new Error("해당 id를 가진 댓글 데이터를 찾을 수 없습니다.");
      error.statusCode = 400;
      throw error;
    }

    const updatedComment = await Comment.update({
      id,
      toUpdate,
    });
    return updatedComment;
  }

  static async deleteComment({ id }) {
    let CommentInfo = await Comment.findById({ id });
    if (!CommentInfo) {
      const error = new Error("해당 id를 가진 댓글 데이터를 찾을 수 없습니다.");
      error.statusCode = 400;
      throw error;
    }

    let session = await mongodb.startSession();
    try {
      session.startTransaction();
      await Review.deleteComment({
        id: CommentInfo.reviewId,
        commentId: id,
        session,
      });
      await Comment.delete({ id, session });
      await session.commitTransaction();
      return { status: "ok" };
    } catch (error) {
      await session.abortTransaction();
      error.statusCode = 500;
      throw error;
    } finally {
      await session.endSession();
    }
  }
}

export { CommentService };
