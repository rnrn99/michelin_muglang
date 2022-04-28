import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { addReview } from "../../redux/restaurantSlice";
import { post } from "../../api";
import styles from "../../css/restaurant/Review.module.css";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

function Review({ setIsModalOpen }) {
  const [reviewText, setReviewText] = useState("");
  const [{ user }, restaurantId, { restaurantReviews }] = useSelector(
    (state) => [
      state.user,
      state.restaurant.restaurantInfo._id,
      state.restaurant,
    ],
    shallowEqual,
  );

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      setIsModalOpen(true);
      return;
    }

    if (!reviewText) return;

    try {
      post("reviews", {
        restaurantId,
        text: reviewText,
      }).then((res) => dispatch(addReview(res.data)));
    } catch (e) {}

    setReviewText("");
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>Review</span>
      <div className={styles.review_input}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="리뷰를 입력해주세요."
            value={reviewText}
            onChange={(e) => {
              setReviewText(e.target.value);
            }}
          />
          <button type="submit">등록</button>
        </form>
      </div>
      <div className={styles.review_list}>
        {restaurantReviews.map((review) => {
          return (
            <div className={styles.review} key={review._id}>
              <div className={styles.review_title}>
                <span className={styles.username}>{review.userName}</span>
                <span className={styles.date}>
                  {review.createdAt.slice(0, 10)}
                </span>
                {user.id === review.userId && (
                  <>
                    <span className={styles.icon_edit}>
                      <EditIcon fontSize="small" />
                    </span>
                    <span className={styles.icon_delete}>
                      <DeleteIcon fontSize="small" />
                    </span>
                  </>
                )}
              </div>
              <div className={styles.content}>{review.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Review;
