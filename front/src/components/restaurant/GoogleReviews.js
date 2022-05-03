import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GoogleReview from "./GoogleReview";
import styles from "../../css/restaurant/GoogleReviews.module.css";
import data from "./googleReviewMock.json";
import { Star as StarIcon } from "@mui/icons-material";
import axios from "axios";

const GoogleReviews = () => {
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const { placeId } = useSelector((state) => state.restaurant.restaurantInfo);
  const result = JSON.parse(JSON.stringify(data));
  const reviews = result.reviews;
  // const [reviews, setReviews] = useState([]);
  // const [rating, setRating] = useState(0);
  const starYellowWidth = result.rating * 24;

  // useEffect(() => {
  //   let config = {
  //     method: "get",
  //     url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`,
  //     headers: {},
  //   };

  //   if (placeId) {
  //     axios(config).then((res) => {
  //       console.log(JSON.stringify(res.data));
  //     });
  //   }
  // }, [placeId]);

  return (
    <div className={styles.container}>
      <span className={styles.title}>Google Review</span>
      <div className={styles.rating}>
        <div className={styles.rating_number}>{result.rating}</div>
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
