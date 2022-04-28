import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setupInfo, setupReviews } from "../../redux/restaurantSlice";
import { get } from "../../api";
import styles from "../../css/restaurant/RestaurantDetailPage.module.css";
import Information from "./Information";
import Review from "./Review";
import NearbyRestaurant from "./NearbyRestaurant";
import LoginRequestModal from "./LoginRequestModal";
import {
  BookmarkBorderOutlined as BookmarkOutlineIcon,
  Bookmark as BookmarkIcon,
} from "@mui/icons-material";

function RestaurantDetailPage() {
  const [bookmark, setBookmark] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [{ user }, { restaurantInfo }] = useSelector((state) => [
    state.user,
    state.restaurant,
  ]);

  const { id } = useParams();
  const dispatch = useDispatch();

  const handleBookmarkClick = () => {
    if (!user.user) {
      setIsModalOpen(true);
      return;
    }

    setBookmark((cur) => !cur);
  };

  const getRestaurantDetail = async () => {
    const getRestaurantInfo = get("restaurants", id);
    const getRestaurantReviews = get("reviewlist/restaurant", id);

    try {
      const [restaurantInfo, restaurantReviews] = await Promise.all([
        getRestaurantInfo,
        getRestaurantReviews,
      ]);

      dispatch(setupInfo(restaurantInfo.data));
      dispatch(setupReviews(restaurantReviews.data));
    } catch (e) {
      // 에러처리 어떻게 해야할까
      console.log(e);
    }
  };

  useEffect(() => {
    getRestaurantDetail();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
          <span className={styles.restaurant_name}>{restaurantInfo.name}</span>
          <div className={styles.bookmark} onClick={handleBookmarkClick}>
            {bookmark ? <BookmarkIcon /> : <BookmarkOutlineIcon />}{" "}
            {restaurantInfo.bookmarkCount}번 북마크됨
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
