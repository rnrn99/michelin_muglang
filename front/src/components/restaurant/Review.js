import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteReview, editReview } from "../../redux/restaurantSlice";
import { patch } from "../../api";
import DeleteConfirmationModal from "../modal/DeleteConfirmationModal";
import styles from "../../css/restaurant/Review.module.css";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const Review = ({ review }) => {
  const [reviewText, setReviewText] = useState(review.text);
  const [isEditing, setIsEditing] = useState(false);
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

  return (
    <>
      <div className={styles.review}>
        <div className={styles.review_title}>
          <span className={styles.username}>{review.userName}</span>
          <span className={styles.date}>{review.createdAt.slice(0, 10)}</span>
          {user?.id === review.userId && (
            <>
              <span
                className={styles.icon_edit}
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <EditIcon fontSize="small" />
              </span>
              <span
                className={styles.icon_delete}
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
