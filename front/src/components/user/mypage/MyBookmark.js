import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteBookmark } from "../../../redux/userSlice";
import Slider from "./Slider";
import DeleteConfirmationModal from "../../modal/DeleteConfirmationModal";
import styles from "../../../css/user/MyBookmark.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

const MyBookmark = () => {
  const { bookmarks } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookmarkId, setBookmarkId] = useState("");

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>나의 북마크</div>
        <Slider contentNum={bookmarks.length} noContentText={"No Bookmark"}>
          {bookmarks.map((restaurant) => (
            <div
              className={styles.restaurant}
              key={restaurant._id}
              style={{
                backgroundImage: `linear-gradient( rgba(100, 100, 100, 0.3), rgba(100, 100, 100, 0.3) ), url(${restaurant.imageUrl[0]})`,
              }}
            >
              <a
                href={`/restaurants/${restaurant._id}`}
                className={styles.restaurant_link}
              >
                <span className={styles.restaurant_name}>
                  {restaurant.name}
                </span>
                <span className={styles.restaurant_country}>
                  {restaurant.country}
                </span>
              </a>
              <div
                className={styles.icon_delete}
                onClick={() => {
                  setIsModalOpen(true);
                  setBookmarkId(restaurant._id);
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
          api={{
            method: "patch",
            endpoint: "bookmarks",
            params: "undo",
            data: { restaurantId: bookmarkId },
          }}
          action={deleteBookmark(bookmarkId)}
        />
      )}
    </>
  );
};

export default MyBookmark;
