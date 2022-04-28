import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import styles from "../../../css/user/MyReview.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

const MyBookmark = () => {
  const { reviews } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(reviews);

  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>나의 리뷰</div>
        <Slider contentLength={reviews.length}>
          {reviews.map((review) => (
            <div className={styles.review} key={review._id}>
              <a
                href={`/restaurant/${review.restaurantId}`}
                className={styles.review_link}
              >
                <div className={styles.review}>
                  <div className={styles.review_date}>
                    {review.createdAt.slice(0, 10)}
                  </div>
                  <div className={styles.restaurant_name}>
                    {review.restaurantName}
                  </div>
                  <div className={styles.review_text}>
                    {review.text.length < 65
                      ? review.text
                      : `${review.text.slice(0, 65)}..`}
                  </div>
                </div>
              </a>
              <div
                className={styles.icon_delete}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <DeleteIcon />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {isModalOpen && (
        <DeleteConfirmationModal
          setIsModalOpen={setIsModalOpen}
          modalContent={"리뷰를"}
        />
      )}
    </>
  );
};

export default MyBookmark;
