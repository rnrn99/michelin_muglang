import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import styles from "../../../css/user/MyBookmark.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

const MyBookmark = () => {
  const { bookmarks } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>나의 북마크</div>
        <Slider contentLength={bookmarks.length}>
          {bookmarks.map((restaurant) => (
            <div className={styles.restaurant}>
              <div
                className={styles.restaurant}
                onClick={() => {
                  navigate(`/restaurant/${restaurant._id}`);
                }}
                key={restaurant._id}
              >
                <span className={styles.restaurant_name}>
                  {restaurant.name}
                </span>
                <span className={styles.restaurant_country}>
                  {restaurant.country}
                </span>
              </div>
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
          modalContent={"북마크를"}
        />
      )}
    </>
  );
};

export default MyBookmark;
