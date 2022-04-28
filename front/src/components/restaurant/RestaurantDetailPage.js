import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  setupInfo,
  setupReviews,
  addBookmark,
  subBookmark,
} from "../../redux/restaurantSlice";
import { get, patch } from "../../api";
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
  const [{ user }, { restaurantInfo }] = useSelector(
    (state) => [state.user, state.restaurant],
    shallowEqual,
  );
  const [bookmark, setBookmark] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const restaurantId = useParams().id;
  const dispatch = useDispatch();

  const handleBookmarkClick = () => {
    if (!user) {
      setIsModalOpen(true);
      return;
    }

    if (bookmark) {
      patch("bookmarks", "undo", { restaurantId });
      dispatch(subBookmark());
      setBookmark(false);
    } else {
      patch("bookmarks", "do", { restaurantId });
      dispatch(addBookmark());
      setBookmark(true);
    }
  };

  const getRestaurantDetail = async () => {
    const getRestaurantInfo = get("restaurants", restaurantId);
    const getRestaurantReviews = get("reviewlist/restaurant", restaurantId);
    const getUserBookmarks = get("bookmarks", user.id);

    try {
      const [restaurantInfo, restaurantReviews, userBookmarks] =
        await Promise.all([
          getRestaurantInfo,
          getRestaurantReviews,
          getUserBookmarks,
        ]);

      dispatch(setupInfo(restaurantInfo.data));
      dispatch(setupReviews(restaurantReviews.data));
      const isBookmarked = userBookmarks.data.some(
        (restaurant) => restaurant._id === restaurantId,
      );
      setBookmark(isBookmarked);
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
