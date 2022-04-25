import React, { useState } from "react";
import styles from "../../css/restaurant/GoogleReview.module.css";
import StarIcon from "@mui/icons-material/Star";

const GoogleReview = ({ review }) => {
  const [detail, setDetail] = useState(false);
  const starYellowWidth = review.rating * 15.4;

  const reviewText = detail ? (
    review.text
  ) : (
    <>
      {review.text.slice(0, 120)}
      {review.text.length > 120 && (
        <>
          ..
          <span
            onClick={() => {
              setDetail(true);
            }}
          >
            자세히
          </span>
        </>
      )}
    </>
  );

  return (
    <div className={styles.review} key={review.time}>
      <div className={styles.review_title}>
        <img src={review.profile_photo_url} alt="×" />
        <span>{review.author_name}</span>
      </div>
      <div className={styles.review_rating}>
        <div className={styles.star}>
          <div className={styles.star_gray}>★ ★ ★ ★ ★</div>
          <div
            className={styles.star_yellow}
            style={{ width: starYellowWidth }}
          >
            ★ ★ ★ ★ ★
          </div>
        </div>
        <span>{review.relative_time_description}</span>
      </div>
      <div className={styles.review_content}>{reviewText}</div>
    </div>
  );
};

export default GoogleReview;
