import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteReview, editReview } from "../../redux/restaurantSlice";
import { patch } from "../../api";
import ReviewComment from "./ReviewComment";
import DeleteConfirmationModal from "../modal/DeleteConfirmationModal";
import styles from "../../css/restaurant/Review.module.css";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Chat as CommentIcon,
} from "@mui/icons-material";

const comments = [
  {
    _id: "626bc3e11bc0e614cc355cac",
    reviewId: "b165370e-b70a-4cf9-a5ee-6f2b625fd4ef",
    userId: "825a2001-f7ec-4637-b923-702886fc26c2",
    userName: "엘리스",
    text: "맛있나요?",
    createdAt: "2022-04-29T10:54:25.691Z",
  },
  {
    _id: "626bc3e11bc0e614cc355caa",
    reviewId: "b165370e-b70a-4cf9-a5ee-6f2b625fd4ef",
    userId: "3b6aebe0-ca55-47e7-9cda-523f28b3aafc",
    userName: "토끼",
    text: "깨끗한가요?",
    createdAt: "2022-04-29T10:54:25.691Z",
  },
];

const Review = ({ review, setLoginRequestModal }) => {
  const [reviewText, setReviewText] = useState(review.text);
  const [commentText, setCommentText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [reviewId, setReviewId] = useState("");
  const [{ user }] = useSelector((state) => [state.user]);

  const dispatch = useDispatch();

  const handleCommentBtnClick = () => {
    if (!user) {
      setLoginRequestModal(true);
    } else {
      setIsCommenting((cur) => !cur);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!reviewText) return;

    const editedReview = await patch("reviews", review.id, {
      text: reviewText,
    });
    dispatch(editReview(editedReview.data));
    setIsEditing(false);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={styles.review}>
        <div className={styles.review_title}>
          <span className={styles.username}>{review.userName}</span>
          <span className={styles.date}>{review.createdAt.slice(0, 10)}</span>
          <span className={styles.comment_btn} onClick={handleCommentBtnClick}>
            <CommentIcon fontSize="small" />
          </span>
          {user?.id === review.userId && (
            <>
              <span
                className={styles.edit_btn}
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <EditIcon fontSize="small" />
              </span>
              <span
                className={styles.delete_btn}
                onClick={() => {
                  setDeleteConfirmModal(true);
                  setReviewId(review.id);
                }}
              >
                <DeleteIcon fontSize="small" />
              </span>
            </>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleEditSubmit} className={styles.edit_form}>
            <textarea
              value={reviewText}
              onChange={(e) => {
                setReviewText(e.target.value);
              }}
            ></textarea>
            <button type="submit">수정</button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              닫기
            </button>
          </form>
        ) : (
          <div className={styles.content}>{review.text}</div>
        )}

        {isCommenting && (
          <form onSubmit={handleCommentSubmit} className={styles.comment_form}>
            <textarea
              placeholder="comment를 작성해주세요."
              value={commentText}
              onChange={(e) => {
                setCommentText(e.target.value);
              }}
            ></textarea>
            <button type="submit">등록</button>
            <button
              type="button"
              onClick={() => {
                setIsCommenting(false);
              }}
            >
              닫기
            </button>
          </form>
        )}

        {comments.map((comment) => (
          <ReviewComment comment={comment} key={comment._id} />
        ))}
      </div>
      {deleteConfirmModal && (
        <DeleteConfirmationModal
          setIsModalOpen={setDeleteConfirmModal}
          modalContent={"리뷰를"}
          api={{ method: "del", endpoint: "reviews", params: reviewId }}
          action={deleteReview(reviewId)}
        />
      )}
    </>
  );
};

export default Review;
