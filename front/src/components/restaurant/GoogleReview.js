import React, { useState } from "react";
import styles from "../../css/restaurant/GoogleReview.module.css";

const GoogleReview = ({ review }) => {
  const [detail, setDetail] = useState(false);

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
        <img src={review.profile_photo_url} />
        <span>{review.author_name}</span>
      </div>
      <div className={styles.review_rating}>
        <div>별 {review.rating}개</div>
        <span>{review.relative_time_description}</span>
      </div>
      <div className={styles.review_content}>{reviewText}</div>
    </div>
  );
};

export default GoogleReview;
