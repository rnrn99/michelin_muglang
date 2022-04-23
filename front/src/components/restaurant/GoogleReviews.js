import React, { useEffect } from "react";
import GoogleReview from "./GoogleReview";
import styles from "../../css/restaurant/GoogleReviews.module.css";
import data from "./googleReviewMock.json";

const GoogleReviews = () => {
  const result = JSON.parse(JSON.stringify(data));
  const totalRating = result.rating;
  const reviews = result.reviews;

  const ratings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  useEffect(() => {
    reviews.map((review) => (ratings[review.rating] += 1));
  }, []);

  return (
    <div className={styles.container}>
      <span className={styles.title}>Google Review</span>
      <div className={styles.rating}>
        <div>{totalRating}</div>
        <div>리뷰 {reviews.length}개</div>
      </div>
      <div className={styles.reviews}>
        {reviews.map((review) => {
          return <GoogleReview review={review} key={review.time} />;
        })}
      </div>
    </div>
  );
};

export default GoogleReviews;
