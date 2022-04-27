import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setup } from "../../redux/restaurantSlice";
import { get } from "../../api";
import styles from "../../css/restaurant/RestaurantDetailPage.module.css";
import BookmarkOutlineIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Information from "./Information";
import Review from "./Review";
import NearbyRestaurant from "./NearbyRestaurant";
import LoginRequestModal from "./LoginRequestModal";

const mockBookmark = 16;

function RestaurantDetailPage() {
  const [bookmark, setBookmark] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, restaurant } = useSelector((state) => state);

  const handleBookmarkClick = () => {
    if (!user.user) {
      setIsModalOpen(true);
      return;
    }

    setBookmark((cur) => !cur);
  };

  const getRestaurantInfo = async () => {
    const res = await get("restaurants", id);
    const data = res.data;
    dispatch(setup(data));
  };

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
          <span className={styles.title}>{restaurant.restaurant.name}</span>
          <div className={styles.bookmark} onClick={handleBookmarkClick}>
            {bookmark ? <BookmarkIcon /> : <BookmarkOutlineIcon />}{" "}
            {mockBookmark}번 북마크됨
          </div>
          <Information />
          <Review setIsModalOpen={setIsModalOpen} />
          <NearbyRestaurant />
        </div>
      </div>
      {isModalOpen && <LoginRequestModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}

export default RestaurantDetailPage;
