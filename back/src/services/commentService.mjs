import { Comment, Review, User } from "../db/index.mjs";

class CommentService {
  static createComment = async ({ reviewId, userId, text }) => {
    const review = await Review.findByReviewId({
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
    const createdNewComment = await Comment.createComment({ newComment });
    createdNewComment.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewComment;
  };

  static updateComment = async ({ id, toUpdate }) => {
    let CommentInfo = await Comment.findByCommentId({ id });
    if (!CommentInfo) {
      const error = new Error("해당 id를 가진 댓글 데이터를 찾을 수 없습니다.");
      error.statusCode = 400;
      throw error;
    }

    const updatedComment = await Comment.updateComment({
      id,
      toUpdate,
    });
    return updatedComment;
  };

  static deleteComment = async ({ id }) => {
    const isDataDeleted = await Comment.deleteComment({ id });
    if (!isDataDeleted) {
      const error = new Error("해당 id를 가진 댓글 데이터를 찾을 수 없습니다.");
      error.statusCode = 400;
      throw error;
    }

    return { status: "ok" };
  };
}

export { CommentService };
