import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { get } from "../../api";
import GoogleReview from "./GoogleReview";
import styles from "../../css/restaurant/GoogleReviews.module.css";
import { Star as StarIcon } from "@mui/icons-material";

const GoogleReviews = () => {
  const { placeId } = useSelector((state) => state.restaurant.restaurantInfo);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const starYellowWidth = rating * 24;

  useEffect(() => {
    if (placeId) {
      get("google", placeId).then((res) => {
        setReviews(res.data.result.reviews);
        setRating(res.data.result.rating);
      });
    }
  }, [placeId]);

  return (
    <>
      {reviews?.length > 0 && (
        <div className={styles.container}>
          <span className={styles.title}>Google Review</span>
          <div className={styles.rating}>
            <div className={styles.rating_number}>{rating}</div>
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
      )}
    </>
  );
};

export default GoogleReviews;
