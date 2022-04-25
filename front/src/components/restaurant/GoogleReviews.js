import React from "react";
import GoogleReview from "./GoogleReview";
import styles from "../../css/restaurant/GoogleReviews.module.css";
import data from "./googleReviewMock.json";
import StarIcon from "@mui/icons-material/Star";

const GoogleReviews = () => {
  const result = JSON.parse(JSON.stringify(data));
  const totalRating = result.rating;
  const starYellowWidth = totalRating * 24;
  const reviews = result.reviews;

  return (
    <div className={styles.container}>
      <span className={styles.title}>Google Review</span>
      <div className={styles.rating}>
        <div className={styles.rating_number}>{totalRating}</div>
        <div className={styles.star}>
          <div className={styles.star_gray}>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
          <div
            className={styles.star_yellow}
            style={{ width: starYellowWidth }}
          >
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
        </div>
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
