import { Comment, Review, User } from "../db/index.mjs";
import { runTransaction } from "../utils/runTransaction.mjs";

class CommentService {
  static async createComment({ reviewId, userId, text }) {
    const review = await Review.findById({
      id: reviewId,
    });

    // db에서 찾지 못한 경우, 에러 메시지 반환
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

    // 리뷰 정보에 댓글 정보 업데이트
    await Review.addComment({
      id: reviewId,
      commentId: createdNewComment._id,
    });

    return createdNewComment;
  }

  static async updateComment({ id, toUpdate }) {
    let CommentInfo = await Comment.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
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

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!CommentInfo) {
      const error = new Error("해당 id를 가진 댓글 데이터를 찾을 수 없습니다.");
      error.statusCode = 400;
      throw error;
    }

    async function txnFunc(session) {
      await Review.deleteComment({
        id: CommentInfo.reviewId,
        commentId: id,
        session,
      }); // 리뷰 정보에서 댓글 정보 삭제
      await Comment.delete({ id, session });

      return { status: "ok" };
    }

    // 모든 데이터 삭제 성공시 최종적으로 db에서 삭제
    const result = await runTransaction(txnFunc);
    return result;
  }
}

export { CommentService };
