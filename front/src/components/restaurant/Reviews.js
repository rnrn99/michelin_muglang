import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { addReview } from "../../redux/restaurantSlice";
import { post } from "../../api";
import styles from "../../css/restaurant/Reviews.module.css";
import Review from "./Review";

function Reviews({ setLoginRequestModal }) {
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
      setLoginRequestModal(true);
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
      <span className={styles.title}>Reviews</span>
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
            <Review
              key={review._id}
              review={review}
              setLoginRequestModal={setLoginRequestModal}
            />
          );
        })}
      </div>
      {restaurantReviews.length === 0 && (
        <div className={styles.no_review}>
          <span>작성된 리뷰가 없습니다.</span>
          <span>이 레스토랑을 이용해보셨다면 첫 리뷰를 남겨보세요 :)</span>
        </div>
      )}
    </div>
  );
}

export default Reviews;
