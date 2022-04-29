import React, { useState } from "react";
import { useSelector } from "react-redux";
import { deleteReview } from "../../../redux/userSlice";
import Slider from "./Slider";
import DeleteConfirmationModal from "../../modal/DeleteConfirmationModal";
import styles from "../../../css/user/MyReview.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

const MyBookmark = () => {
  const { reviews } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewId, setReviewId] = useState("");

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>나의 리뷰</div>
        <Slider contentNum={reviews.length} noContentText={"No Review"}>
          {reviews.map((review) => (
            <div className={styles.review} key={review._id}>
              <a
                href={`/restaurants/${review.restaurantId}`}
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
                  setReviewId(review.id);
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
          api={{ method: "del", endpoint: "reviews", params: reviewId }}
          action={deleteReview(reviewId)}
        />
      )}
    </>
  );
};

export default MyBookmark;
