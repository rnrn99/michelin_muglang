import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteReview, editReview } from "../../redux/restaurantSlice";
import { patch } from "../../api";
import DeleteConfirmationModal from "../modal/DeleteConfirmationModal";
import styles from "../../css/restaurant/Review.module.css";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Chat as CommentIcon,
} from "@mui/icons-material";

const Review = ({ review }) => {
  const [reviewText, setReviewText] = useState(review.text);
  const [commentText, setCommentText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [reviewId, setReviewId] = useState("");
  const [{ user }] = useSelector((state) => [state.user]);

  const dispatch = useDispatch();

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!reviewText) return;

    const editedReview = await patch("reviews", review.id, {
      text: reviewText,
    });
    dispatch(editReview(editedReview.data));
    setIsEditing(false);
  };

  const handleComment = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={styles.review}>
        <div className={styles.review_title}>
          <span className={styles.username}>{review.userName}</span>
          <span className={styles.date}>{review.createdAt.slice(0, 10)}</span>
          <span
            className={styles.icon_comment}
            onClick={() => {
              setIsCommenting((cur) => !cur);
            }}
          >
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
          <form onSubmit={handleEdit} className={styles.edit_form}>
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
          <form onSubmit={handleComment} className={styles.comment_form}>
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
